import Sequelize, { Op } from "sequelize"

export const db = new Sequelize("trello_db", null, null, {
  dialect: "sqlite",
  storage: ":memory:",
  operatorsAliases: {
    $and: Op.and,
    $or: Op.or,
    $eq: Op.eq,
    $gt: Op.gt,
    $lt: Op.lt,
    $lte: Op.lte,
    $like: Op.like
  }
})
