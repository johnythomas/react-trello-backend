import { Sequelize } from "sequelize"
import { db } from "../util/config"
import Board from "./Board"

const List = db.define(
  "list",
  {
    name: {
      type: Sequelize.STRING,
      field: "name",
      unique: true
    },
    boardId: {
      type: Sequelize.INTEGER,
      model: Board,
      key: "id"
    }
  },
  {
    timestamps: true
  }
)

export default List
