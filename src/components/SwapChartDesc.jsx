const SwapChartDesc = () => {
    return (
        <div>
            <h3>Understanding the AMM Curve y = k / x</h3>
            <p>
                The blue line represents all possible states of the pool. The
                product of the two must always stay the same - k.
            </p>
            <p>
                The mechanic of a swap: when we trade, we move from the red
                starting point to the purple point along this curve. Adding
                Token A makes the pool release Token B to keep the balance.
            </p>
            <p>
                The curve is not a straight line, that's why the slippage
                happens. The more tokens we try to take, the steeper the curve
                becomes. The distance between the points shows the slippage –
                the price change caused by our trade size relative to the pool's
                depth.
            </p>
            <p>
                Since the graph is hyperbola, the curve never touches the axes
                (0). This means the pool can never be fully emptied. Tokens just
                become more expensive as they get rare.
            </p>
        </div>
    )
}

export default SwapChartDesc
