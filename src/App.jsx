import { useState, useMemo } from "react"
import "./styles/App.css"
import SwapForm from "./components/SwapForm.jsx"
import SwapScenarios from "./components/SwapScenarios.jsx"
import SwapResult from "./components/SwapResult.jsx"
import SwapChart from "./components/SwapChart.jsx"
import SwapChartDesc from "./components/SwapChartDesc.jsx"
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
        if (field !== "direction") value = Number(value)
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
                            tokenIn={
                                swapParams.direction === "AtoB" ?
                                    swapParams.resA
                                :   swapParams.resB
                            }
                            tokenOut={
                                swapParams.direction === "AtoB" ?
                                    swapParams.resB
                                :   swapParams.resA
                            }
                            amountIn={swapParams.amountIn}
                            amountOut={
                                result === null ? 0 : result.amountOut
                            }></SwapChart>
                    </div>
                    <div className="desc-card">
                        <SwapChartDesc />
                    </div>
                </section>
            </div>
        </main>
    )
}

export default App
