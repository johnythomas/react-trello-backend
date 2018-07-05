import { Sequelize } from "sequelize"
import { db } from "../util/config"
import List from "./List"

const Item = db.define(
  "item",
  {
    title: {
      type: Sequelize.STRING,
      field: "title"
    },
    body: {
      type: Sequelize.TEXT,
      field: "body"
    },
    listId: {
      type: Sequelize.INTEGER,
      model: List,
      key: "id"
    }
  },
  {
    timestamps: true
  }
)

export default Item
