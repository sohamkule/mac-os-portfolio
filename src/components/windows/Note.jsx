import { useEffect, useState } from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { paraisoDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import MacWindow from './MacWindow'

import './notes.scss'

const Note = ({
    windowName,
    closeWindow,
    activeWindow,
    focusWindow,
    windowMode,
    setWindowMode,
    desktopRef,
}) => {
    const [markdown, setMarkdown] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadNote = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch('/note.txt')

                if (!response.ok) {
                    throw new Error(
                        `Failed to load note (${response.status})`
                    )
                }

                const text = await response.text()

                setMarkdown(text)
            } catch (err) {
                console.error(
                    'Failed to load note:',
                    err
                )

                setError('Unable to load the note.')
            } finally {
                setLoading(false)
            }
        }

        loadNote()
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
            <div className="note-window">
                {loading && (
                    <p>Loading...</p>
                )}

                {!loading && error && (
                    <p>{error}</p>
                )}

                {!loading && !error && (
                    <SyntaxHighlighter
                        language="typescript"
                        style={paraisoDark}
                    >
                        {markdown}
                    </SyntaxHighlighter>
                )}
            </div>
        </MacWindow>
    )
}

export default Note