const env = require("dotenv").config()
const db = require("./db")

module.exports = {
  ...env.parsed,
  ...db
}