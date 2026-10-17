import axios from 'axios'

const GITHUB_USERNAME = 'sohamkule'

const CACHE_KEY = 'github_repositories'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
  },
})

const normalizeRepository = (repository) => ({
  id: repository.id,
  name: repository.name,
  description:
    repository.description ||
    'No description available.',

  url: repository.html_url,
  demoUrl: repository.homepage || null,

  language: repository.language,
  topics: repository.topics || [],

  stars: repository.stargazers_count,
  forks: repository.forks_count,

  updatedAt: repository.updated_at,
  createdAt: repository.created_at,

  isFork: repository.fork,
  isArchived: repository.archived,

  visibility: repository.visibility,
})

const getCachedRepositories = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)

    if (!cached) {
      return null
    }

    const parsed = JSON.parse(cached)

    if (!parsed.timestamp || !parsed.data) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }

    const isExpired =
      Date.now() - parsed.timestamp >
      CACHE_DURATION

    if (isExpired) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }

    return parsed.data
  } catch (error) {
    console.error(
      'Failed to read GitHub cache:',
      error
    )

    localStorage.removeItem(CACHE_KEY)

    return null
  }
}

const cacheRepositories = (data) => {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      })
    )
  } catch (error) {
    console.error(
      'Failed to cache GitHub repositories:',
      error
    )
  }
}

export const clearGithubCache = () => {
  localStorage.removeItem(CACHE_KEY)
}


let repositoriesRequest = null

export const getRepositories = async ({
  forceRefresh = false,
} = {}) => {
  // Use localStorage cache unless a forced refresh was requested
  if (!forceRefresh) {
    const cachedRepositories = getCachedRepositories()

    if (cachedRepositories) {
      return cachedRepositories
    }
  }

  // If a request is already running, reuse it
  if (repositoriesRequest && !forceRefresh) {
    return repositoriesRequest
  }

  repositoriesRequest = (async () => {
    try {
      const response = await githubApi.get(
        `/users/${GITHUB_USERNAME}/repos`,
        {
          params: {
            type: 'owner',
            sort: 'updated',
            direction: 'desc',
            per_page: 100,
          },
        }
      )

      const repositories = response.data
        .filter(
          (repository) =>
            !repository.fork &&
            !repository.archived
        )
        .map(normalizeRepository)

      cacheRepositories(repositories)

      return repositories
    } catch (error) {
      if (
        error.response?.status === 403 ||
        error.response?.status === 429
      ) {
        throw new Error(
          'GitHub API rate limit reached. Please try again later.',
          {
            cause: error,
          }
        )
      }

      if (!error.response) {
        throw new Error(
          'Unable to connect to GitHub. Please check your internet connection.',
          {
            cause: error,
          }
        )
      }

      throw new Error(
        'Unable to load GitHub repositories.',
        {
          cause: error,
        }
      )
    } finally {
      repositoriesRequest = null
    }
  })()

  return repositoriesRequest
}