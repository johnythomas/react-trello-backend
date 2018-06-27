import express from "express"

const router = express.Router()

const boards = [
  {
    id: 1,
    name: "React"
  },
  {
    id: 2,
    name: "Daily Work"
  }
]

router.get("/", (req, res) => {
  res.send(boards)
})

export default router
