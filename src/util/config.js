import Sequelize from "sequelize"

export const db = new Sequelize("trello_db", null, null, {
  dialect: "sqlite",
  storage: ":memory:"
})
