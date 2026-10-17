import MacWindow from './MacWindow'

import './spotify.scss'

const Spotify = ({
    windowName,
    closeWindow,
    activeWindow,
    focusWindow,
    windowMode,
    setWindowMode,
    desktopRef,
}) => {
    return (
        <MacWindow
            windowName={windowName}
            closeWindow={closeWindow}
            activeWindow={activeWindow}
            focusWindow={focusWindow}
            windowMode={windowMode}
            setWindowMode={setWindowMode}
            desktopRef={desktopRef}
            width="25vw"
        >
            <div className="spotify-window">
                <iframe
                    data-testid="embed-iframe"
                    style={{
                        borderRadius: '12px',
                    }}
                    src="https://open.spotify.com/embed/playlist/2HcHd7HMQUqKY0zacrHOjF?utm_source=generator&si=e077c0b0ccbc4846"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    title="Soham Kule Spotify Playlist"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                />
            </div>
        </MacWindow>
    )
}

export default Spotify