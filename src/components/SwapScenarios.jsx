import "../styles/SwapScenarios.css"
import Button from "./Button.jsx"

const base = {
    resA: 100,
    resB: 1000,
    fee: 0.003,
    direction: "AtoB",
}
const scenarios = [
    {
        label: "Small",
        amountIn: 1,
    },
    {
        label: "Medium",
        amountIn: 10,
    },
    {
        label: "Large",
        amountIn: 40,
    },
]
const SwapScenarios = (props) => {
    const { setSwapParams } = props
    return (
        <div className="scenarios-container">
            <p className="scenarios-title">Different Swap Scenarios</p>
            <div className="scenarios-grid">
                {scenarios.map((scenario) => {
                    return (
                        <Button
                            key={scenario.label}
                            onClick={() =>
                                setSwapParams({ ...base, ...scenario })
                            }>
                            {scenario.label}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}

export default SwapScenarios
