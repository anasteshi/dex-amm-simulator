import "../styles/Field.css"

const Field = (props) => {
    const { text, name, value, onChange, type = "text", max } = props

    return (
        <label className="field">
            {text}
            <input
                type={type}
                value={value}
                min={0}
                max={max}
                name={name}
                onChange={(event) =>
                    onChange(event.target.name, event.target.value)
                }
            />
        </label>
    )
}

export default Field
