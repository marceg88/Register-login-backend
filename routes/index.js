const express = require("express")
const app = express()

const usersRoutes = require("./users.routes")

app.use("/user", usersRoutes)

module.exports = app