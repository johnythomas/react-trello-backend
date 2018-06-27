import express from "express"
import logger from "morgan"
import bodyParser from "body-parser"
import board from "./routes/board"

const app = express()

app.use(logger("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/board", board)

const { PORT = 8080 } = process.env
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)) // eslint-disable-line no-console
