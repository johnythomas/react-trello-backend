import express from "express"
import Board from "../models/Board"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const boards = await Board.findAll()
    res.send(boards)
  } catch (err) {
    res.send(err)
  }
})

export default router
