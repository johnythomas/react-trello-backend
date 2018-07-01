import { Sequelize } from "sequelize"
import { db } from "../util/config"

const Board = db.define(
  "board",
  {
    name: {
      type: Sequelize.STRING,
      field: "name",
      unique: true
    }
  },
  {
    timestamps: true
  }
)

export default Board
