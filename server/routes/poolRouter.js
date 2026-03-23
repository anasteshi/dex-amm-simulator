import express from "express"
import { getPool, createPool } from "../controllers/pool.js"

// Router for Pool controllers
const router = express.Router()
router.route("/").get(getPool).post(createPool)

export default router
