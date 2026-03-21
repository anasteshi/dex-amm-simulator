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

const SwapChart = (props) => {
    const { reserveA, reserveB } = props
    // Constant-product of tokens
    const k = reserveA * reserveB
    const points = []

    /*  Since it's a hyperbola it can't be 0,
        bc y=k/x -> y=k/0.
        That's why 0.1 is used to set a starting point.
    */
    const startX = reserveA * 0.1
    const endX = reserveA * 2
    const step = (endX - startX) / 15

    for (let x = startX; x <= endX; x += step) {
        points.push({
            x: x.toFixed(2),
            y: (k / x).toFixed(2),
        })
    }

    // Config for Line component
    const options = {
        // responsive: true,
        scales: {
            x: {
                type: "linear",
                position: "bottom",
                title: { display: true, text: "Reserve A" },
            },
            y: {
                title: { display: true, text: "Reserve B" },
            },
        },
    }

    const data = {
        datasets: [
            {
                data: [{ x: reserveA, y: reserveB }],
                pointBackgroundColor: "#a30000",
                pointRadius: 5,
            },
            {
                data: points,
                borderColor: "#0047ff",
                pointRadius: 3,
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
