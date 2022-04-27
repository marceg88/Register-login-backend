const User = require("../models/users.schema")
const mongoose = require("mongoose")

const UserServices = {
    async findUserById(id){
        try {
            const user = await User.findById(id)
            return user
        } catch (error) {
            return error
        }
    },
    async findByEmail(email){
        try {
            const user = await User.findOne({email})
            return user
        } catch (error) {
            return error
        }
    },
    async register(user){
        try {
            const newUser = new User(user)
            await newUser.save()
            return newUser
        } catch (error) {
            return error
        }
    },
    async findByUserName(userName){
        try {
            const user = await User.findOne({userName})
            return user
        } catch (error) {
            return error
        }
    },
    async editUser(id, user){
        try {
            const currentUser = await User.findById(id)
            if(user.age !== "") currentUser.age = user.age
            if(user.address !== "") currentUser.address = user.address
            if(user.contact !== "") currentUser.contact = user.contact
            const userUpdated = currentUser.save()
            return userUpdated
        } catch (error) {
            return error
        }
    },
    async deleteUser(id){
        try {
            await User.findByIdAndDelete(id)
            return
        } catch (error) {
            return error
        }
    }
}

module.exports = UserServices