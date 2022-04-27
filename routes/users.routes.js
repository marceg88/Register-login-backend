const express = require("express")
const router = express.Router()

const { userRegister, userLogin, userUpdated, userDeleted } = require("../controllers/users.controllers")

router.post(
    "/", 
    userRegister
)

router.post(
    "/login",
    userLogin
)

router.put(
    "/:userId",
    userUpdated
)

router.delete(
    "/:userId",
    userDeleted
)

module.exports = router