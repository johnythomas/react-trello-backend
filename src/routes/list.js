import express from "express"
import List from "../models/List"
import { check, validationResult } from "express-validator/check"

const router = express.Router()

router.post(
  "/:boardId/list/",
  [
    check("list.name", "List should have name")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const { list } = req.body
      list.boardId = req.params.boardId
      res.send(await List.create(list))
    } catch (err) {
      res.send(err)
    }
  }
)

router.get("/:boardId/list/", async (req, res) => {
  try {
    const { boardId } = req.params
    const lists = await List.findAll({ where: { boardId } })
    res.send(lists)
  } catch (err) {
    res.send(err)
  }
})

router.get("/:boardId/list/:listId", async (req, res) => {
  try {
    const { listId, boardId } = req.params
    const list = await List.find({
      where: {
        $and: [{ id: listId }, { boardId }]
      }
    })
    return !list ? res.status(404).send("not found") : res.send(list)
  } catch (err) {
    res.send(err)
  }
})

router.put(
  "/:boardId/list/:listId",
  [
    check("list.name", "List should have name")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      const { listId, boardId } = req.params
      const query = {
        where: {
          $and: [{ id: listId }, { boardId }]
        }
      }
      const list = await List.find(query)
      if (!list) {
        res.status(404).send("List not found")
      }

      list.name = req.body.list.name
      await List.update(
        {
          name: list.name
        },
        query
      )
      res.send(list)
    } catch (err) {
      res.send(err)
    }
  }
)

router.delete("/:boardId/list", async (req, res) => {
  try {
    const { boardId } = req.params

    const query = { where: { boardId } }

    const lists = await List.findAll(query)
    if (lists.length === 0) {
      return res.status(400).send("not found")
    }

    await List.destroy(query)
    res.send("deleted")
  } catch (err) {
    res.send(err)
  }
})

router.delete("/:boardId/list/:listId", async (req, res) => {
  try {
    const { listId, boardId } = req.params

    const query = {
      where: {
        $and: [{ id: listId }, { boardId }]
      }
    }

    const list = await List.find(query)
    if (!list) {
      return res.status(400).send("not found")
    }

    await List.destroy(query)
    res.send("deleted")
  } catch (err) {
    res.send(err)
  }
})

export default router
