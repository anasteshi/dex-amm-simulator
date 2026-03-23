import "../styles/SwapChart.css"
import { Line } from "react-chartjs-2"
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
} from "chart.js"

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
)

// Visualises the constant-product curve and the state transition (before/after swap)
const SwapChart = (props) => {
    const { tokenIn, tokenOut, amountIn, amountOut } = props
    // Constant-product of tokens
    const k = tokenIn * tokenOut
    const points = []

    /*  Since it's a hyperbola it can't be 0,
        because y=k/x -> y=k/0.
        That's why 0.1 is used to set a starting point.
    */

    // X axis
    const tokenInSwap = tokenIn + amountIn
    // Y axis
    const tokenOutSwap = tokenOut - amountOut

    const startX = Math.min(tokenIn, tokenInSwap) * 0.5
    const endX = Math.max(tokenIn, tokenInSwap) * 1.5

    const step = (endX - startX) / 20

    for (let x = startX; x <= endX; x += step) {
        // if (x === 0) continue
        points.push({
            x: x.toFixed(2),
            y: (k / x).toFixed(2),
        })
    }

    // Config for Line component
    const options = {
        scales: {
            x: {
                type: "linear",
                position: "bottom",
                title: { display: true, text: "Reserve In" },
            },
            y: {
                title: { display: true, text: "Reserve Out" },
            },
        },
    }

    const data = {
        datasets: [
            {
                // Before swap
                data: [{ x: tokenIn, y: tokenOut }],
                pointBackgroundColor: "#a30000",
                pointRadius: 5,
            },
            {
                // After swap
                data: [{ x: tokenInSwap, y: tokenOutSwap }],
                pointBackgroundColor: "#6a00a3",
                pointRadius: 5,
            },
            {
                data: points,
                borderColor: "#0047ff",
                pointRadius: 0,
            },
        ],
    }

    return (
        <div className="line-chart">
            <Line options={options} data={data} />
        </div>
    )
}

export default SwapChart
