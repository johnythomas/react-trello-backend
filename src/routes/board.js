import express from "express"
import Board from "../models/Board"

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const board = await Board.create(req.body.board)
    res.send(board)
  } catch (err) {
    res.send(err)
  }
})

router.get("/", async (req, res) => {
  try {
    const boards = await Board.findAll()
    res.send(boards)
  } catch (err) {
    res.send(err)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const board = await Board.find({ where: { id: req.params.id } })
    res.send(board)
  } catch (err) {
    res.send(err)
  }
})

export default router
