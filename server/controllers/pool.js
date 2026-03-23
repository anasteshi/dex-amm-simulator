import Pool from "../models/Pool.js"

// Fetch the most recent pool state to sync with the front-end
const getPool = async (req, res) => {
    const pool = await Pool.findOne({}).sort("-createdAt")
    res.status(200).json(pool)
}

// Store a new pool state after a swap
const createPool = async (req, res) => {
    const pool = await Pool.create(req.body)
    res.status(201).json(pool)
}

export { getPool, createPool }
