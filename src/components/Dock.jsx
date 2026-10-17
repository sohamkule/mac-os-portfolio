import './dock.scss'

import social from '../data/social'

const Dock = ({
    openWindow,
    windowSystem,
    activeWindow,
}) => {

    const openExternal = (url) => {
        window.open(
            url,
            '_blank',
            'noopener,noreferrer'
        )
    }

    const openMail = () => {
        window.location.href =
            `mailto:${social.email.address}`
    }

    const getIconClass = (windowName) => {

        const isOpen = windowSystem?.[windowName]?.open

        const isActive =
            activeWindow === windowName

        return `
            icon
            ${windowName}
            ${isOpen ? 'open' : ''}
            ${isActive ? 'active' : ''}
        `
    }

    return (

        <footer
            className="dock"
            aria-label="Application Dock"
        >

            {/* GITHUB */}

            <button
                type="button"
                onClick={() => openWindow('github')}
                className={getIconClass('github')}
                aria-label="Open GitHub"
                title="GitHub"
            >

                <img
                    src="/doc-icons/github.svg"
                    alt=""
                    aria-hidden="true"
                />

                {windowSystem?.github?.open && (
                    <span className="running-indicator" />
                )}

            </button>


            {/* NOTES */}

            <button
                type="button"
                onClick={() => openWindow('note')}
                className={getIconClass('note')}
                aria-label="Open Notes"
                title="Notes"
            >

                <img
                    src="/doc-icons/note.svg"
                    alt=""
                    aria-hidden="true"
                />

                {windowSystem?.note?.open && (
                    <span className="running-indicator" />
                )}

            </button>


            {/* RESUME */}

            <button
                type="button"
                onClick={() => openWindow('resume')}
                className={getIconClass('resume')}
                aria-label="Open Resume"
                title="Resume"
            >

                <img
                    src="/doc-icons/pdf.svg"
                    alt=""
                    aria-hidden="true"
                />

                {windowSystem?.resume?.open && (
                    <span className="running-indicator" />
                )}

            </button>


            {/* CALENDAR */}

            <button
                type="button"
                onClick={() =>
                    openExternal(
                        'https://calendar.google.com/'
                    )
                }
                className="icon calender"
                aria-label="Open Google Calendar"
                title="Calendar"
            >

                <img
                    src="/doc-icons/calender.svg"
                    alt=""
                    aria-hidden="true"
                />

            </button>


            {/* SPOTIFY */}

            <button
                type="button"
                onClick={() => openWindow('spotify')}
                className={getIconClass('spotify')}
                aria-label="Open Spotify"
                title="Spotify"
            >

                <img
                    src="/doc-icons/spotify.svg"
                    alt=""
                    aria-hidden="true"
                />

                {windowSystem?.spotify?.open && (
                    <span className="running-indicator" />
                )}

            </button>


            {/* MAIL */}

            <button
                type="button"
                onClick={openMail}
                className="icon mail"
                aria-label="Send email"
                title="Email"
            >

                <img
                    src="/doc-icons/mail.svg"
                    alt=""
                    aria-hidden="true"
                />

            </button>


            {/* LINKEDIN */}

            <button
                type="button"
                onClick={() =>
                    openExternal(
                        social.linkedin.url
                    )
                }
                className="icon link"
                aria-label="Open LinkedIn"
                title="LinkedIn"
            >

                <img
                    src="/doc-icons/link.svg"
                    alt=""
                    aria-hidden="true"
                />

            </button>


            {/* TERMINAL */}

            <button
                type="button"
                onClick={() => openWindow('cli')}
                className={getIconClass('cli')}
                aria-label="Open Terminal"
                title="Terminal"
            >

                <img
                    src="/doc-icons/cli.svg"
                    alt=""
                    aria-hidden="true"
                />

                {windowSystem?.cli?.open && (
                    <span className="running-indicator" />
                )}

            </button>

        </footer>
    )
}

export default Dock