import express from "express"
import logger from "morgan"
import bodyParser from "body-parser"
import board from "./routes/board"
import list from "./routes/list"
import Board from "./models/Board"
import List from "./models/List"

const app = express()

app.use(logger("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/board", board)
app.use("/board", list)

app.use((req, res, next) => {
  const err = new Error("Not Found")
  err.status = 404
  next(err)
})

Board.sync()
List.sync()

app.use((err, req, res) => {
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}
  res.status(err.status || 500).send(err)
})

const { PORT = 8080 } = process.env
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)) // eslint-disable-line no-console
