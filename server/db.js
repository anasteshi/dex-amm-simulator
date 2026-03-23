import mongoose from "mongoose"

// Connect to MongoDB
const connectDB = (url) => {
    return mongoose.connect(url)
}

export default connectDB
