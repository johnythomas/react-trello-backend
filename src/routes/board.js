import express from "express"
import { check, validationResult } from "express-validator/check"
import Board from "../models/Board"
import List from "../models/List"
import Item from "../models/Item"

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
      res.status(400).send(err)
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
    const board = await Board.find({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: List,
          as: "lists",
          include: {
            model: Item,
            as: "items"
          }
        }
      ]
    })
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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const query = {
      where: { id }
    }
    const board = await Board.find(query)
    if (!board) {
      return res.status(400).send("not found")
    }
    await Board.destroy(query)
    res.send("deleted")
  } catch (err) {
    res.status(400).send(err)
  }
})

export default router
