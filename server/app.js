import express from "express"
import "dotenv/config"
import cors from "cors"
import poolRouter from "./routes/poolRouter.js"
import connectDB from "./db.js"

// Server
const app = express()
const port = process.env.PORT

// Middleware
app.use(express.json())
app.use(cors())
app.use("/api/pool", poolRouter)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is loading on port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
