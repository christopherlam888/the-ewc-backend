import express from "express";
import ewcDatabase from "./database.mjs";

const router = express.Router()

// Get request to retrieve information from the database
router.get('/search/', async (req, res) => {
    console.log(req.query)
    res.status(200)
})

export default router