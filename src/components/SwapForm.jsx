import "../styles/SwapForm.css"
import Field from "./Field.jsx"
import Button from "./Button.jsx"

const SwapForm = ({ swapParams, handleChange }) => {
    const { reserveA, reserveB, amountIn, fee, direction } = swapParams

    return (
        <div className="form">
            <Field
                text="Reserve A:"
                name="reserveA"
                value={reserveA}
                onChange={handleChange}
            />
            <Field
                text="Reserve B:"
                name="reserveB"
                value={reserveB}
                onChange={handleChange}
            />
            <Field
                text="Amount In:"
                name="amountIn"
                value={amountIn}
                onChange={handleChange}
            />
            <Field
                text="Fee:"
                name="fee"
                max={0.999}
                value={fee}
                onChange={handleChange}
            />

            <Button
                onClick={() =>
                    handleChange(
                        "direction",
                        direction === "AtoB" ? "BtoA" : "AtoB",
                    )
                }>
                {direction === "AtoB" ? "A ⇄ B" : "B ⇄ A"}
            </Button>
        </div>
    )
}

export default SwapForm
