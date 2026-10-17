import { useState } from 'react'

import './nav.scss'

import DateTime from './DateTime'

const Nav = ({
    openWindow,
    closeWindow,
    setWindowMode,
    windowSystem,
    activeWindow,
    focusWindow,
}) => {

    const [activeMenu, setActiveMenu] = useState(null)

    const toggleMenu = (menuName) => {

        setActiveMenu((currentMenu) =>
            currentMenu === menuName
                ? null
                : menuName
        )

    }

    const closeMenu = () => {
        setActiveMenu(null)
    }

    const closeAllWindows = () => {

        Object.keys(windowSystem).forEach((windowName) => {
            closeWindow(windowName)
        })

        closeMenu()

    }

    const openAndCloseMenu = (windowName) => {

        openWindow(windowName)

        closeMenu()

    }

    const closeActiveWindow = () => {

        if (!activeWindow) {
            return
        }

        closeWindow(activeWindow)

        closeMenu()

    }

    const minimizeActiveWindow = () => {

        if (!activeWindow) {
            return
        }

        setWindowMode(
            activeWindow,
            'minimized'
        )

        closeMenu()

    }

    const maximizeActiveWindow = () => {

        if (!activeWindow) {
            return
        }

        const currentMode =
            windowSystem[activeWindow]?.mode

        setWindowMode(
            activeWindow,
            currentMode === 'maximized'
                ? 'normal'
                : 'maximized'
        )

        closeMenu()

    }

    return (

        <nav>

            {/* LEFT SIDE */}

            <div className="left">

                {/* APPLE MENU */}

                <div className="menu-wrapper">

                    <button
                        type="button"
                        className="apple-icon menu-trigger"
                        onClick={() =>
                            toggleMenu('apple')
                        }
                    >

                        <img
                            src="/navbar-icons/apple.svg"
                            alt="Apple Menu"
                        />

                    </button>

                    {activeMenu === 'apple' && (

                        <div className="dropdown apple-menu">

                            <button
                                onClick={() =>
                                    openAndCloseMenu('github')
                                }
                            >
                                About This Portfolio
                            </button>

                            <div className="menu-divider" />

                            <button
                                onClick={() =>
                                    openAndCloseMenu('github')
                                }
                            >
                                GitHub
                            </button>

                            <button
                                onClick={() =>
                                    window.open(
                                        'https://www.linkedin.com',
                                        '_blank'
                                    )
                                }
                            >
                                LinkedIn
                            </button>

                            <div className="menu-divider" />

                            <button
                                onClick={closeAllWindows}
                            >
                                Close All Windows
                            </button>

                        </div>

                    )}

                </div>


                {/* NAME */}

                <div className="nav-item name">

                    <p>Soham Kule</p>

                </div>


                {/* FILE MENU */}

                <div className="menu-wrapper">

                    <button
                        type="button"
                        className="nav-item menu-trigger"
                        onClick={() =>
                            toggleMenu('file')
                        }
                    >
                        File
                    </button>

                    {activeMenu === 'file' && (

                        <div className="dropdown">

                            <button
                                onClick={() =>
                                    openAndCloseMenu('note')
                                }
                            >
                                New Note
                            </button>

                            <button
                                onClick={() =>
                                    openAndCloseMenu('resume')
                                }
                            >
                                Open Resume
                            </button>

                            <div className="menu-divider" />

                            <button
                                disabled={!activeWindow}
                                onClick={closeActiveWindow}
                            >
                                Close Active Window
                            </button>

                        </div>

                    )}

                </div>


                {/* WINDOW MENU */}

                <div className="menu-wrapper">

                    <button
                        type="button"
                        className="nav-item menu-trigger"
                        onClick={() =>
                            toggleMenu('window')
                        }
                    >
                        Window
                    </button>

                    {activeMenu === 'window' && (

                        <div className="dropdown">

                            <button
                                disabled={!activeWindow}
                                onClick={minimizeActiveWindow}
                            >
                                Minimize
                            </button>

                            <button
                                disabled={!activeWindow}
                                onClick={maximizeActiveWindow}
                            >
                                {windowSystem[activeWindow]?.mode ===
                                'maximized'
                                    ? 'Restore'
                                    : 'Maximize'}
                            </button>

                            <button
                                disabled={!activeWindow}
                                onClick={closeActiveWindow}
                            >
                                Close Window
                            </button>

                            <div className="menu-divider" />

                            <button
                                onClick={closeAllWindows}
                            >
                                Close All Windows
                            </button>

                            <div className="menu-divider" />

                            {Object.entries(windowSystem).map(
                                ([windowName, windowData]) => (

                                    <button
                                        key={windowName}
                                        className={
                                            activeWindow === windowName
                                                ? 'active-window'
                                                : ''
                                        }
                                        onClick={() => {

                                            if (!windowData.open) {

                                                openWindow(windowName)

                                            } else {

                                                focusWindow(windowName)

                                            }

                                            closeMenu()

                                        }}
                                    >
                                        {windowName}
                                    </button>

                                )
                            )}

                        </div>

                    )}

                </div>


                {/* TERMINAL MENU */}

                <div className="menu-wrapper">

                    <button
                        type="button"
                        className="nav-item menu-trigger"
                        onClick={() =>
                            toggleMenu('terminal')
                        }
                    >
                        Terminal
                    </button>

                    {activeMenu === 'terminal' && (

                        <div className="dropdown">

                            <button
                                onClick={() =>
                                    openAndCloseMenu('cli')
                                }
                            >
                                New Terminal
                            </button>

                            <button
                                onClick={() =>
                                    openAndCloseMenu('cli')
                                }
                            >
                                Open Terminal
                            </button>

                        </div>

                    )}

                </div>

            </div>


            {/* RIGHT SIDE */}

            <div className="right">

                <div className="nav-icon">

                    <img
                        src="/navbar-icons/wifi.svg"
                        alt="WiFi"
                    />

                </div>

                <div className="nav-item">

                    <DateTime />

                </div>

            </div>

        </nav>

    )

}

export default Nav