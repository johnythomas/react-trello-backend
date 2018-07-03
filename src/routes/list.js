import express from "express"
import List from "../models/List"

const router = express.Router()

router.post("/:boardId/list/", async (req, res) => {
  try {
    const { list } = req.body
    list.boardId = req.params.boardId
    res.send(await List.create(list))
  } catch (err) {
    res.send(err)
  }
})

router.get("/:boardId/list/", async (req, res) => {
  try {
    const { boardId } = req.params
    const lists = await List.findAll({ where: { boardId } })
    res.send(lists)
  } catch (err) {
    res.send(err)
  }
})

export default router
