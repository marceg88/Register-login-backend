const UserServices = require("../services/users.service")
const bcrypt = require("bcrypt")

const userRegister = async(req, res, next) => {
    const { firstName, lastName, userName, email, age, address, contact, password } = req.body
    const passwordEncrypted = await bcrypt.hash(password, 10)
    const userExist = await UserServices.findByEmail(email)
    if(userExist){
        res.status(401).json({
            message: "The user already exist.",
            status: "Failed",
            data: {}
        })
    } else {
        const userNameExist = await UserServices.findByUserName(userName)
        if(userNameExist){
            res.status(400).json({
                message: "The userName already exist.",
                status: "Failed",
                data: {}
            })
        } else {
            try {
                const newUser = await UserServices.register({firstName, lastName, userName, email, age, address, contact, password: passwordEncrypted})
                console.log("newUser", newUser)
                res.status(200).json({
                    message: "The user was successfully registered.",
                    status: "Ok",
                    data: newUser
                })
            } catch (error) {
                res.status(500).json({
                    message: "The user could not register",
                    status: "Failed",
                    data: error
                })
            }
        }
        
    }
}

const userLogin = async(req, res, next) => {
    const { userName, password } = req.body
    const userExist = await UserServices.findByUserName(userName)
    if(userExist){
        const isEqual = await bcrypt.compare(password, userExist.password)
        if(isEqual){
            res.status(200).json({
                message: "The user login successfully",
                status: "Ok",
                data: userExist
            })
        } else {
            res.status(400).json({
                message: "The user or password incorrect.",
                status: "Ok",
                data: {}
            })
        }
        
    } else {
        res.status(400).json({
            message: "The user or password incorrect.",
            status: "Ok",
            data: {}
        })
    }
}

const userUpdated = async(req, res, next) => {
    const { userId } = req.params
    const { age, contact, address } = req.body
    try {
        const user = await UserServices.editUser(userId, { age, contact, address })
        res.status(200).json({
            message: "The user was successfully modified",
            status: "Ok",
            data: user
        })
    } catch (error) {
        res.status(503).json({
            message: "The user could not be modified",
            status: "Failed",
            data: {}
        })
    }
}

const userDeleted = async(req, res, next) => {
    const { userId } = req.params
    try {
        const user = await UserServices.deleteUser(userId)
        res.status(200).json({
            message: "The user was successfully deleted",
            status: "Ok",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            message: "The user could not be deleted",
            status: "Failed",
            data: {}
        })
    }
}

module.exports = {userRegister, userLogin, userUpdated, userDeleted}