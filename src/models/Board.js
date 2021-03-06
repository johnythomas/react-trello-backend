import { Sequelize } from "sequelize"
import { db } from "../util/config"
import List from "./List"

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

Board.hasMany(List, {
  as: "lists",
  foreignKey: {
    allowNull: false
  }
})

export default Board
