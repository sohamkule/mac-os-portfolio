import './desktopIcon.scss'

const DesktopIcon = ({
    icon,
    label,
    onOpen,
    selected,
    onSelect,
}) => {

    const handleClick = (event) => {
        event.stopPropagation()

        onSelect()
    }

    const handleDoubleClick = (event) => {
        event.stopPropagation()

        onOpen()
    }

    return (
        <button
            type="button"
            className={`desktop-icon ${
                selected ? 'selected' : ''
            }`}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            aria-label={`Open ${label}`}
        >

            <div className="desktop-icon-image">

                <img
                    src={icon}
                    alt=""
                    aria-hidden="true"
                />

            </div>

            <span className="desktop-icon-label">
                {label}
            </span>

        </button>
    )
}

export default DesktopIcon