import { Router } from "express"
import Item from "../models/Item"
import { check, validationResult } from "express-validator/check"

const router = Router()

router.post(
  "/:boardId/list/:listId/item",
  [
    check("item.title", "Item should have title")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const item = Item.build({
        title: req.body.item.title,
        body: req.body.item.body,
        listId: req.params.listId
      })
      res.send(await item.save())
    } catch (err) {
      res.send(err)
    }
  }
)

router.get("/:boardId/list/:listId/item/", async (req, res) => {
  try {
    const query = {
      where: {
        listId: req.params.listId
      }
    }
    const items = await Item.findAll(query)

    return items.length === 0
      ? res.status("404").send("Not Found")
      : res.send(items)
  } catch (err) {
    res.send(err)
  }
})

router.get("/:boardId/list/:listId/item/:itemId", async (req, res) => {
  try {
    const { itemId, listId } = req.params

    const query = {
      where: {
        $and: [{ id: itemId }, { listId }]
      }
    }
    const item = await Item.find(query)

    return !item ? res.status("404").send("Not Found") : res.send(item)
  } catch (err) {
    res.send(err)
  }
})

router.put(
  "/:boardId/list/:listId/item/:itemId",
  [
    check("item.title", "Item should have title")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const { itemId, listId } = req.params
      const query = {
        where: {
          $and: [{ id: itemId }, { listId }]
        }
      }
      const item = await Item.find(query)

      if (!item) return res.status("404").send("Item not found")

      await Item.update(
        {
          title: req.body.item.title,
          body: req.body.item.body
        },
        query
      )
      res.status(204).send()
    } catch (err) {
      res.status(500).send(err)
    }
  }
)

router.delete("/:boardId/list/:listId/item/:itemId", async (req, res) => {
  try {
    const { itemId, listId } = req.params

    const query = {
      where: {
        $and: [{ id: itemId }, { listId }]
      }
    }
    const item = await Item.find(query)
    if (!item) {
      return res.status(404).send("Not Found")
    }

    await Item.destroy(query)
    res.send("Deleted")
  } catch (err) {
    res.send(err)
  }
})

router.delete("/:boardId/list/:listId/item/", async (req, res) => {
  try {
    const query = {
      where: {
        listId: req.params.listId
      }
    }
    const items = await Item.findAll(query)
    if (items.length === 0) {
      return res.status(404).send("Not Found")
    }

    await Item.destroy(query)
    res.send("Deleted")
  } catch (err) {
    res.send(err)
  }
})

export default router
