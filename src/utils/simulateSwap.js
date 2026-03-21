/*  Simulates a swap on a Constant-Product AMM (Uniswap v2).
    Uses the x * y = k formula to find trade outcome and slippage.
*/
const simulateSwap = (reserveA, reserveB, amountIn, fee, tradeDir = "AtoB") => {
    // Prevent division by zero or invalid fee value
    if (reserveA <= 0 || reserveB <= 0 || amountIn <= 0 || fee >= 1) return null

    // Calculate the desired constant-product value before the swap
    const k = reserveA * reserveB

    // Extract the fee from the input amount
    const amountInWithFee = amountIn - amountIn * fee

    // Calculate the market price before the trade
    const initialPrice =
        tradeDir === "AtoB" ? reserveB / reserveA : reserveA / reserveB

    let newReserveA, newReserveB, amountOut

    // Calculate output based on the constant-product formula
    if (tradeDir === "AtoB") {
        // Swap Token A for Token B
        newReserveA = reserveA + amountIn // Total reserve after trade
        newReserveB = k / (reserveA + amountInWithFee) // Target reserve to maintain "k"
        amountOut = reserveB - newReserveB // Tokens given to the trader
    } else {
        // Swap Token B for Token A
        newReserveB = reserveB + amountIn
        newReserveA = k / (reserveB + amountInWithFee)
        amountOut = reserveA - newReserveA
    }

    const effectivePrice = amountOut / amountIn // Average price paid for the trade

    // Find difference between the initial price and the effective price
    const slippage = ((initialPrice - effectivePrice) / initialPrice) * 100

    return {
        amountOut,
        newReserveA,
        newReserveB,
        slippage,
        initialPrice,
        effectivePrice,
    }
}

export default simulateSwap
