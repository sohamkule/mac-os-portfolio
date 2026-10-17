import './app.scss'

import Dock from './components/Dock'
import Nav from './components/Nav'

import Github from './components/windows/Github'
import Note from './components/windows/Note'
import Resume from './components/windows/Resume'
import Spotify from './components/windows/Spotify'
import Cli from './components/windows/Cli'

import DesktopIcon from './components/DesktopIcon'

import { useRef, useState } from 'react'

const App = () => {
    const [windowSystem, setWindowSystem] = useState({
        github: {
            open: false,
            mode: 'normal',
        },
        note: {
            open: false,
            mode: 'normal',
        },
        resume: {
            open: false,
            mode: 'normal',
        },
        spotify: {
            open: false,
            mode: 'normal',
        },
        cli: {
            open: false,
            mode: 'normal',
        },
    })

    const [activeWindow, setActiveWindow] = useState(null)

    const [selectedIcon, setSelectedIcon] =
        useState(null)

    const desktopRef = useRef(null)

    // Open / restore a window
    const openWindow = (windowName) => {
        setWindowSystem((prev) => ({
            ...prev,
            [windowName]: {
                ...prev[windowName],
                open: true,
                mode: 'normal',
            },
        }))

        setActiveWindow(windowName)
    }

    // Close a window completely
    const closeWindow = (windowName) => {
        setWindowSystem((prev) => ({
            ...prev,
            [windowName]: {
                ...prev[windowName],
                open: false,
                mode: 'normal',
            },
        }))

        setActiveWindow((current) =>
            current === windowName ? null : current
        )
    }

    // Bring a window to the front
    const focusWindow = (windowName) => {
        setActiveWindow(windowName)
    }

    // Change normal / minimized / maximized state
    const setWindowMode = (windowName, mode) => {
        setWindowSystem((prev) => ({
            ...prev,
            [windowName]: {
                ...prev[windowName],
                mode,
            },
        }))

        setActiveWindow(windowName)
    }

    return (
        <main className="app">
            <Nav
                openWindow={openWindow}
                closeWindow={closeWindow}
                setWindowMode={setWindowMode}
                windowSystem={windowSystem}
                activeWindow={activeWindow}
                focusWindow={focusWindow}
            />

            <div
                ref={desktopRef}
                className="desktop"
            >

                <div
                    className="desktop-icons"
                    onClick={() => setSelectedIcon(null)}
                >

                    <DesktopIcon
                        icon="/doc-icons/github.svg"
                        label="GitHub"
                        selected={selectedIcon === 'github'}
                        onSelect={() => setSelectedIcon('github')}
                        onOpen={() => openWindow('github')}
                    />

                    <DesktopIcon
                        icon="/doc-icons/note.svg"
                        label="Notes"
                        selected={selectedIcon === 'note'}
                        onSelect={() => setSelectedIcon('note')}
                        onOpen={() => openWindow('note')}
                    />

                    <DesktopIcon
                        icon="/doc-icons/pdf.svg"
                        label="Resume"
                        selected={selectedIcon === 'resume'}
                        onSelect={() => setSelectedIcon('resume')}
                        onOpen={() => openWindow('resume')}
                    />

                    <DesktopIcon
                        icon="/doc-icons/spotify.svg"
                        label="Spotify"
                        selected={selectedIcon === 'spotify'}
                        onSelect={() => setSelectedIcon('spotify')}
                        onOpen={() => openWindow('spotify')}
                    />

                    <DesktopIcon
                        icon="/doc-icons/cli.svg"
                        label="Terminal"
                        selected={selectedIcon === 'cli'}
                        onSelect={() => setSelectedIcon('cli')}
                        onOpen={() => openWindow('cli')}
                    />

                </div>

                {windowSystem.github.open && (
                    <Github
                        windowName="github"
                        closeWindow={closeWindow}
                        activeWindow={activeWindow}
                        focusWindow={focusWindow}
                        windowMode={windowSystem.github.mode}
                        setWindowMode={setWindowMode}
                        desktopRef={desktopRef}
                    />
                )}

                {windowSystem.note.open && (
                    <Note
                        windowName="note"
                        closeWindow={closeWindow}
                        activeWindow={activeWindow}
                        focusWindow={focusWindow}
                        windowMode={windowSystem.note.mode}
                        setWindowMode={setWindowMode}
                        desktopRef={desktopRef}
                    />
                )}

                {windowSystem.resume.open && (
                    <Resume
                        windowName="resume"
                        closeWindow={closeWindow}
                        activeWindow={activeWindow}
                        focusWindow={focusWindow}
                        windowMode={windowSystem.resume.mode}
                        setWindowMode={setWindowMode}
                        desktopRef={desktopRef}
                    />
                )}

                {windowSystem.spotify.open && (
                    <Spotify
                        windowName="spotify"
                        closeWindow={closeWindow}
                        activeWindow={activeWindow}
                        focusWindow={focusWindow}
                        windowMode={windowSystem.spotify.mode}
                        setWindowMode={setWindowMode}
                        desktopRef={desktopRef}
                    />
                )}

                {windowSystem.cli.open && (
                    <Cli
                        windowName="cli"
                        closeWindow={closeWindow}
                        activeWindow={activeWindow}
                        focusWindow={focusWindow}
                        windowMode={windowSystem.cli.mode}
                        setWindowMode={setWindowMode}
                        desktopRef={desktopRef}
                    />
                )}

                <Dock
                    openWindow={openWindow}
                    windowSystem={windowSystem}
                    activeWindow={activeWindow}
                />
            </div>
        </main>
    )
}

export default App