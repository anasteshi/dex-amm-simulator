import "../styles/SwapResult.css"

const SwapResult = (props) => {
    const { result, direction } = props

    return (
        <div className="results">
            <div className="card">
                <h3>You will get:</h3>
                <p className="big-number">
                    {result.amountOut.toFixed(4)}{" "}
                    {direction === "AtoB" ? "B" : "A"}
                </p>
            </div>

            <div className="stats">
                <p>
                    <strong>Slippage:</strong>
                    <span
                        style={{
                            color: result.slippage > 5 ? "#cb3434" : "#00a606",
                        }}>
                        {result.slippage.toFixed(2)}%
                    </span>
                </p>
                <p>
                    <strong>Initial Price:</strong>
                    <span>{result.initialPrice}</span>
                </p>
                <p>
                    <strong>Effective Price:</strong>
                    <span>{result.effectivePrice}</span>
                </p>
                <p>
                    <strong>New Reserve A:</strong>
                    <span>{result.newReserveA}</span>
                </p>
                <p>
                    <strong>New Reserve B:</strong>
                    <span>{result.newReserveB}</span>
                </p>
            </div>
        </div>
    )
}

export default SwapResult
