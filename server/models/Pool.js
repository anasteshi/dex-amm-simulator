import mongoose from "mongoose"

// Create a Schema for Pool document
const poolSchema = mongoose.Schema({
    reserveA: {
        type: Number,
        required: true,
    },
    reserveB: {
        type: Number,
        required: true,
    },
    amountIn: {
        type: Number,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    },
    direction: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

export default mongoose.model("Pool", poolSchema)
