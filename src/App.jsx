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
        <div>
            <h1>DEX Swap Simulator</h1>
            <SwapForm swapParams={swapParams} handleChange={handleChange} />
            <SwapScenarios setSwapParams={setSwapParams} />
            {result && (
                <SwapResult result={result} direction={swapParams.direction} />
            )}
            <SwapChart reserveA={swapParams.resA} reserveB={swapParams.resB}></SwapChart>
        </div>
    )
}

export default App
