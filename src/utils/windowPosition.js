const WINDOW_OFFSET = 40

const getInitialWindowPosition = (windowName) => {
    const positions = {
        github: {
            x: 180,
            y: 100,
        },

        note: {
            x: 260,
            y: 140,
        },

        resume: {
            x: 340,
            y: 180,
        },

        spotify: {
            x: 420,
            y: 220,
        },

        cli: {
            x: 500,
            y: 260,
        },
    }

    return positions[windowName] || {
        x: WINDOW_OFFSET,
        y: WINDOW_OFFSET,
    }
}

export default getInitialWindowPosition