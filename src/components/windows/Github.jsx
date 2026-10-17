import { useCallback, useEffect, useState } from 'react'

import MacWindow from './MacWindow'

import { getRepositories } from '../../api/github'

import './github.scss'

const formatUpdatedDate = (date) => {
    if (!date) return 'Unknown'

    return new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(new Date(date))
}

const GitCard = ({ data }) => {
    return (
        <div className="card">
            <div className="card-content">
                <h1>{data.name}</h1>

                <p className="description">
                    {data.description}
                </p>

                <div className="tags">
                    {data.language && (
                        <p className="tag">
                            {data.language}
                        </p>
                    )}

                    {data.topics?.map((topic) => (
                        <p
                            key={topic}
                            className="tag"
                        >
                            {topic}
                        </p>
                    ))}
                </div>

                <div className="stats">
                    <span>
                        ★ {data.stars}
                    </span>

                    <span>
                        ⑂ {data.forks}
                    </span>
                </div>

                <p className="updated">
                    Updated{' '}
                    {formatUpdatedDate(
                        data.updatedAt
                    )}
                </p>

                <div className="urls">
                    <a
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Repository
                    </a>

                    {data.demoUrl && (
                        <a
                            href={data.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

const Github = ({
    windowName,
    closeWindow,
    activeWindow,
    focusWindow,
    windowMode,
    setWindowMode,
    desktopRef,
}) => {
    const [repositories, setRepositories] =
        useState([])

    const [loading, setLoading] =
        useState(true)

    const [error, setError] =
        useState(null)

const loadRepositories = useCallback(
    async ({ forceRefresh = false } = {}) => {
        try {
            setLoading(true)
            setError(null)

            const data = await getRepositories({
                forceRefresh,
            })

            setRepositories(data)
        } catch (err) {
            console.error(
                'Failed to load GitHub repositories:',
                err
            )

            setError(
                err.message ||
                'Unable to load GitHub repositories.'
            )
        } finally {
            setLoading(false)
        }
    },
    []
)

useEffect(() => {
    let cancelled = false

    const loadInitialRepositories = async () => {
        try {
            const data = await getRepositories()

            if (cancelled) return

            setRepositories(data)
        } catch (err) {
            if (cancelled) return

            console.error(
                'Failed to load GitHub repositories:',
                err
            )

            setError(
                err.message ||
                'Unable to load GitHub repositories.'
            )
        } finally {
            if (!cancelled) {
                setLoading(false)
            }
        }
    }

    loadInitialRepositories()

    return () => {
        cancelled = true
    }
}, [])

    useEffect(() => {
        let cancelled = false

        const loadInitialRepositories = async () => {
            try {
                const data = await getRepositories()

                if (cancelled) return

                setRepositories(data)
            } catch (err) {
                if (cancelled) return

                console.error(
                    'Failed to load GitHub repositories:',
                    err
                )

                setError(
                    err.message ||
                    'Unable to load GitHub repositories.'
                )
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        loadInitialRepositories()

        return () => {
            cancelled = true
        }
    }, [])

    return (
        <MacWindow
            windowName={windowName}
            closeWindow={closeWindow}
            activeWindow={activeWindow}
            focusWindow={focusWindow}
            windowMode={windowMode}
            setWindowMode={setWindowMode}
            desktopRef={desktopRef}
        >
            <div className="github-window">

                <div className="github-header">

                    <div>
                        <h2>
                            Repositories
                        </h2>

                        {!loading && !error && (
                            <p>
                                {repositories.length}{' '}
                                {repositories.length === 1
                                    ? 'repository'
                                    : 'repositories'}
                            </p>
                        )}
                    </div>

                    <div className="github-header-actions">

                        <button
                            type="button"
                            className="github-refresh"
                            onClick={() =>
                                loadRepositories({
                                    forceRefresh: true,
                                })
                            }
                            disabled={loading}
                            aria-label="Refresh repositories"
                        >
                            ↻
                        </button>

                        <a
                            href="https://github.com/sohamkule"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-profile-link"
                        >
                            View GitHub Profile
                        </a>

                    </div>
                </div>

                {loading && (
                    <div className="github-state">
                        <p>
                            Loading repositories...
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="github-state github-error">
                        <p>{error}</p>

                        <button
                            type="button"
                            onClick={() =>
                                loadRepositories({
                                    forceRefresh: true,
                                })
                            }
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading &&
                    !error &&
                    repositories.length === 0 && (
                        <div className="github-state">
                            <p>
                                No public repositories found.
                            </p>
                        </div>
                    )}

                {!loading &&
                    !error &&
                    repositories.length > 0 && (
                        <div className="cards">
                            {repositories.map(
                                (repository) => (
                                    <GitCard
                                        key={repository.id}
                                        data={repository}
                                    />
                                )
                            )}
                        </div>
                    )}

            </div>
        </MacWindow>
    )
}

export default Github