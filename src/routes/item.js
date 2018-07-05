import { Router } from "express"
import Item from "../models/Item"

const router = Router()

router.post("/:boardId/list/:listId/item", async (req, res) => {
  try {
    const item = Item.build({
      title: req.body.item.title,
      body: req.body.item.body,
      listId: req.params.listId
    })
    res.send(await item.save())
  } catch (err) {
    res.send(err)
  }
})

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
