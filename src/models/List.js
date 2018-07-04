import { Sequelize } from "sequelize"
import { db } from "../util/config"
import Board from "./Board"
import Item from "./Item"

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

List.hasMany(Item, {
  as: "items",
  foreignKey: {
    allowNull: false
  }
})

export default List
