
import profile from '../data/profile'
import skills from '../data/skills'
import social from '../data/social'
import './Portfolio.scss'



const projects = [
  {
    name: 'Productivity Workspace Dashboard',
    description:
      'A browser-based productivity workspace featuring task management, a daily planner, a Pomodoro timer, and daily goals. Uses LocalStorage to preserve data between sessions.',
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'LocalStorage',
    ],
    live: 'https://productivityworkspace.netlify.app/',
    github:
      'https://github.com/sohamkule/Productivity-dashboard-Glass-Themed',
  },
  {
    name: 'Smart AI Document Q&A System',
    description:
      'A multilingual document Q&A application using multimodal retrieval-augmented generation (RAG), document context retrieval, and a Wikipedia fallback for additional answers.',
    technologies: [
      'Python',
      'Streamlit',
      'LangChain',
      'Gemini API',
      'Astra DB',
      'FAISS',
    ],
    live: '',
    github: 'https://github.com/sohamkule/RAG-system',
  },
  {
    name: 'React Developer Portfolio',
    description:
      'A responsive personal portfolio built with React and Vite, featuring reusable UI components, a structured project showcase, responsive styling, and a downloadable resume.',
    technologies: [
      'React',
      'JavaScript',
      'Vite',
      'SCSS',
    ],
    live: '',
    github:
      'https://github.com/sohamkule/mac-os-portfolio',
  },
]



const Portfolio = () => {
  return (
    <main className="portfolio">
      <header className="portfolio-header">
        <a className="portfolio-logo" href="#home">
          SK<span>.</span>
        </a>

        <nav className="portfolio-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#education">Education</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        <a
          className="header-contact"
          href={`mailto:${social.email.address}`}
        >
          Let's talk
        </a>
      </header>

      <section className="hero section-container" id="home">
        <p className="eyebrow">
          <span className="status-dot" />
          OPEN TO ENTRY-LEVEL OPPORTUNITIES
        </p>

        <h1>
          Hi, I'm <span className="gradient-text">{profile.name}</span>
          <br />
          I build for the web.
        </h1>

        <p className="hero-description">
          A B.Tech Information Technology graduate focused on frontend
          development, JavaScript, and React. I enjoy turning ideas into
          useful, responsive web experiences.
        </p>

        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            Explore my work <span aria-hidden="true">↗</span>
          </a>

          <a
            className="button button-secondary"
            href={social.github.url}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a
            className="button button-secondary"
            href={profile.resume}
            download="Soham_Kule_Resume.pdf"
          >
            Download Resume <span aria-hidden="true">↓</span>
          </a>
        </div>

        <p className="hero-location">Based in {profile.location}</p>
      </section>

      <section className="content-section section-container" id="about">
        <p className="section-label">01 / ABOUT</p>
        <h2>A little about me</h2>

        <p className="section-description">
          I'm an aspiring software developer with a foundation in web
          development and a growing interest in backend systems and AI.
          I focus on building practical projects, learning through
          implementation, and improving my problem-solving skills.
        </p>
      </section>


      <section className="content-section section-container" id="education">
        <p className="section-label">02 / EDUCATION</p>
        <h2>Education</h2>

        <div className="education-list">
          {profile.education.map((item) => (
            <article className="education-card" key={item.degree}>
              <div className="education-details">
                <h3>{item.degree}</h3>
                <p className="education-institution">{item.institution}</p>
                <p className="education-year">{item.graduation}</p>
              </div>

              <p className="education-score">
                <span>{item.score}</span>
                <small>{item.scoreType}</small>
              </p>
            </article>
          ))}
        </div>
      </section>


      <section className="content-section section-container" id="skills">
        <p className="section-label">02 / SKILLS</p>
        <h2>Technologies I work with</h2>

        <div className="skills-grid">
          {Object.entries(skills).map(([category, items]) => (
            <article className="skill-card" key={category}>
              <h3>{category.replace(/^./, (letter) => letter.toUpperCase())}</h3>
              <div className="skill-tags">
                {items.map((skill) => (
                  <span className="skill-tag" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section section-container" id="projects">
        <p className="section-label">03 / SELECTED WORK</p>
        <h2>Projects I've built</h2>
        <p className="section-description">
          A selection of projects where I've explored frontend development,
          productivity tools, and AI-powered applications.
        </p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.name}>
              <div className="project-number">
                PROJECT 0{index + 1}
              </div>

              <h3>{project.name}</h3>
              <p>{project.description}</p>

              <div className="skill-tags">
                {project.technologies.map((technology) => (
                  <span className="skill-tag" key={technology}>
                    {technology}
                  </span>
                ))}
              </div>

              <div className="project-links">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer">
                    Live demo ↗
                  </a>
                )}

                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                )}

                {!project.live && !project.github && (
                  <span className="project-link-pending">
                    Project link to be added
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section section-container" id="contact">
        <p className="section-label">04 / CONTACT</p>
        <h2>Let's build something useful.</h2>
        <p className="section-description">
          I'm looking for entry-level opportunities where I can contribute,
          learn from a team, and grow as a developer.
        </p>

        <a
          className="button button-primary"
          href={`mailto:${social.email.address}`}
        >
          Email me <span aria-hidden="true">↗</span>
        </a>

        <div className="social-links">
          <a href={social.github.url} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={social.linkedin.url} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={social.instagram.url} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </section>

      <footer className="portfolio-footer">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Built with React and SCSS.</p>
      </footer>
    </main>
  )
}

export default Portfolio
