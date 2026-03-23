import { useState, useMemo, useEffect } from "react"
import "./styles/App.css"
import SwapForm from "./components/SwapForm.jsx"
import SwapScenarios from "./components/SwapScenarios.jsx"
import SwapResult from "./components/SwapResult.jsx"
import SwapChart from "./components/SwapChart.jsx"
import SwapChartDesc from "./components/SwapChartDesc.jsx"
import simulateSwap from "./utils/simulateSwap.js"
import Button from "./components/Button.jsx"

const App = () => {
    const [swapParams, setSwapParams] = useState({
        reserveA: 0,
        reserveB: 0,
        amountIn: 0,
        fee: 0.003,
        direction: "AtoB",
    })

    const getPool = async () => {
        const response = await fetch("https://dex-amm-simulator.onrender.com/api/pool")
        const data = await response.json()
        console.log(data)
        setSwapParams(data)
    }

    const addPool = async () => {
        await fetch("https://dex-amm-simulator.onrender.com/api/pool", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...swapParams }),
        })
        alert("Pool stored")
    }

    // Memoise results to prevent unnecessary recalculations on every re-render
    const result = useMemo(() => {
        const { reserveA, reserveB, amountIn, fee, direction } = swapParams
        return simulateSwap(reserveA, reserveB, amountIn, fee, direction)
    }, [swapParams])

    const handleChange = (field, value) => {
        if (field !== "direction" && field !== "fee") value = Number(value)
        setSwapParams((prev) => ({ ...prev, [field]: value }))
    }

    // Sync with backend on initial load
    useEffect(() => {
        getPool()
    }, [])

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
                    <Button className="store-pool-btn" onClick={addPool}>
                        Store Pool State
                    </Button>
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
                                (swapParams.direction === "AtoB" ?
                                    swapParams.reserveA
                                :   swapParams.reserveB) || 1
                            }
                            tokenOut={
                                (swapParams.direction === "AtoB" ?
                                    swapParams.reserveB
                                :   swapParams.reserveA) || 1
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
