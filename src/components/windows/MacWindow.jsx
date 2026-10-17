import { useRef, useState, useEffect, } from 'react'
import { Rnd } from 'react-rnd'
import './window.scss'
import getInitialWindowPosition from '../../utils/windowPosition'

const WINDOW_TITLES = {
    github: 'GitHub',
    note: 'Notes',
    resume: 'Resume.pdf',
    spotify: 'Spotify',
    cli: 'sohamkule — zsh',
}

const MacWindow = ({
    children,
    width = '40vw',
    height = '40vh',
    windowName,
    closeWindow,
    activeWindow,
    focusWindow,
    windowMode,
    setWindowMode,
    desktopRef,
}) => {
    const previousGeometry = useRef(null)

    const initialPosition = getInitialWindowPosition(windowName)

    const [geometry, setGeometry] = useState({
        x: initialPosition.x,
        y: initialPosition.y,
        width,
        height,
    })

    const [isMobile, setIsMobile] =
        useState(window.innerWidth <= 600)
    useEffect(() => {

        const handleResize = () => {
            setIsMobile(
                window.innerWidth <= 600
            )
        }

        window.addEventListener(
            'resize',
            handleResize
        )

        return () => {
            window.removeEventListener(
                'resize',
                handleResize
            )
        }

    }, [])

    const isActive = activeWindow === windowName

    const windowTitle =
        WINDOW_TITLES[windowName] || 'Soham Kule'

    const isFullscreen =
        windowMode === 'maximized' || isMobile

    const windowPosition = isFullscreen
        ? {
            x: 0,
            y: 0,
        }
        : {
            x: geometry.x,
            y: geometry.y,
        }


    const windowSize = isFullscreen
        ? {
            width: '100%',
            height: '100%',
        }
        : {
            width: geometry.width,
            height: geometry.height,
        }

    /*
     * Minimized windows are removed from the desktop.
     * Their state is still preserved inside App.jsx.
     */
    if (windowMode === 'minimized') {
        return null
    }

    const handleMaximize = () => {
        const desktop = desktopRef?.current

        if (!desktop) {
            console.warn('Desktop reference is unavailable.')
            return
        }

        /*
         * RESTORE
         */
        if (windowMode === 'maximized') {
            if (!previousGeometry.current) {
                return
            }

            setGeometry({
                ...previousGeometry.current,
            })

            setWindowMode(windowName, 'normal')
            return
        }

        /*
         * SAVE CURRENT GEOMETRY
         */
        previousGeometry.current = {
            ...geometry,
        }

        /*
         * MAXIMIZE
         */
        setGeometry({
            x: 0,
            y: 0,
            width: desktop.clientWidth,
            height: desktop.clientHeight,
        })

        setWindowMode(windowName, 'maximized')
    }

    const handleClose = (event) => {
        event.preventDefault()
        event.stopPropagation()

        closeWindow(windowName)
    }

    const handleMinimize = (event) => {
        event.preventDefault()
        event.stopPropagation()

        setWindowMode(windowName, 'minimized')
    }

    const handleMaximizeClick = (event) => {
        event.preventDefault()
        event.stopPropagation()

        handleMaximize()
    }

    return (
        <Rnd
            position={windowPosition}

            size={windowSize}

            bounds="parent"
            minWidth={300}
            minHeight={200}
            dragHandleClassName="window-drag-handle"

            disableDragging={isFullscreen}
            enableResizing={!isFullscreen}

            onMouseDown={() => focusWindow(windowName)}
            onDragStop={(event, data) => {
                setGeometry((previous) => ({
                    ...previous,
                    x: data.x,
                    y: data.y,
                }))
            }}
            onResizeStop={(
                event,
                direction,
                ref,
                delta,
                position
            ) => {
                setGeometry({
                    x: position.x,
                    y: position.y,
                    width: ref.offsetWidth,
                    height: ref.offsetHeight,
                })
            }}
            style={{
                zIndex: isActive ? 100 : 10,
            }}
            className={isActive ? 'window-active' : 'window-inactive'}
        >
            <div className="window">
                <div className="nav">
                    <div className="dots">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="dot red close"
                            aria-label="Close window"
                            title="Close"
                        />

                        <button
                            type="button"
                            onClick={handleMinimize}
                            className="dot yellow minimize"
                            aria-label="Minimize window"
                            title="Minimize"
                        />

                        <button
                            type="button"
                            onClick={handleMaximizeClick}
                            className="dot green maximize"
                            aria-label="Maximize window"
                            title="Maximize"
                        />
                    </div>

                    <div className="title window-drag-handle">
                        <p>{windowTitle}</p>
                    </div>
                </div>

                <div className="main-content">
                    {children}
                </div>
            </div>
        </Rnd>
    )
}

export default MacWindow