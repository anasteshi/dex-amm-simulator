import { useState, useMemo } from "react"
import "./styles/App.css"
import SwapForm from "./components/SwapForm.jsx"
import SwapScenarios from "./components/SwapScenarios.jsx"
import SwapResult from "./components/SwapResult.jsx"
import SwapChart from "./components/SwapChart.jsx"
import simulateSwap from "./utils/simulateSwap.js"

const App = () => {
    const [swapParams, setSwapParams] = useState({
        resA: 1000,
        resB: 1000,
        amountIn: 0,
        fee: 0,
        direction: "AtoB",
    })

    const result = useMemo(() => {
        const { resA, resB, amountIn, fee, direction } = swapParams
        return simulateSwap(
            Number(resA),
            Number(resB),
            Number(amountIn),
            Number(fee),
            direction,
        )
    }, [swapParams])

    const handleChange = (field, value) => {
        setSwapParams((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <main className="app-container">
            <h1>DEX Swap Simulator</h1>
            <div className="layout">
                <section className="calc-column">
                    <SwapForm
                        swapParams={swapParams}
                        handleChange={handleChange}
                    />
                    <SwapScenarios setSwapParams={setSwapParams} />
                    {result && (
                        <SwapResult
                            result={result}
                            direction={swapParams.direction}
                        />
                    )}
                </section>
                <section className="chart-column">
                    <div className="chart-card">
                        <SwapChart
                            tokenIn={swapParams.direction === "AtoB" ? swapParams.resA :swapParams.resB}
                            tokenOut={swapParams.direction === "AtoB" ? swapParams.resB :swapParams.resA}></SwapChart>
                    </div>
                    <div className="desc-card">
                        <h3>Understanding the AMM Curve y = k / x</h3>
                        <p>
                            The blue line represents all possible states of the
                            pool. The product of the two must always stay the
                            same - k.
                        </p>
                        <p>
                            The mechanic of a swap: when we trade, we move the
                            red point along this curve. Adding Token A makes the
                            pool release Token B to keep the balance.
                        </p>
                        <p>
                            The curve is not a straight line, that's why the
                            slippage happens. The more tokens we try to take,
                            the steeper the curve becomes. This is slippage, the
                            price change caused by our trade size relative to
                            the pool's depth.
                        </p>
                        <p>
                            Since the graph is hyperbola, the curve never
                            touches the axes (0). This means the pool can never
                            be fully emptied. Tokens just become more expensive
                            as they get rare.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default App
