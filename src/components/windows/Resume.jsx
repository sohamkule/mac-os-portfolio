import MacWindow from './MacWindow'
import './resume.scss'

const Resume = ({
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
            width="55vw"
            height="70vh"
        >
            <div className="resume-window">
                <iframe
                    src="/resume.pdf"
                    title="Soham Kule Resume"
                />
            </div>
        </MacWindow>
    )
}

export default Resume