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

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params

    if (!req.body.board || !req.body.board.name || !id) {
      return res.send("mandatory fields missing")
    }

    const board = await Board.find({ where: { id } })

    if (!board) {
      return res.send("invalid id")
    }

    const { name } = req.body.board
    await Board.update(
      {
        name
      },
      {
        where: { id }
      }
    )
    res.send(await Board.find({ where: { id } }))
  } catch (err) {
    res.send(err)
  }
})

export default router
