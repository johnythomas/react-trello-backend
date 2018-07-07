import express from "express"
import { check, validationResult } from "express-validator/check"
import Board from "../models/Board"

const router = express.Router()

router.post(
  "/",
  [
    check("board.name", "Board should have name")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    try {
      const board = await Board.create(req.body.board)
      res.send(board)
    } catch (err) {
      res.send(err)
    }
  }
)

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

router.put(
  "/:id",
  [
    check("board")
      .not()
      .isEmpty(),
    check("board.name")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const { id } = req.params

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
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
  }
)

export default router
