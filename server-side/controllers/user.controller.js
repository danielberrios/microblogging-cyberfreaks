const UserModel = require('../models/user.model')

class UserController {
    constructor() { /* Initializes UserModel */ }

    async registerUser(req, res) {
        try{
            await UserModel.addNewUser(req.body)
            res.status(201).send("Successfully registered new user.")

        } catch (error) {
            res.status(409).send(error.message)
        }
    }

    async getAllUsers(req, res) {
        try{
            let users = await UserModel.getListOfUsers()
            res.status(200).send(users)
        } catch(error) {
            res.status(404).send("Resources not found.")
        }
    }

    async getUserById(req, res) {
        let user = await UserModel.getSpecificUserWith(req.query.uid)
        
        if(user)
            res.status(200).send(user)
        else
            res.status(404).send("User not found.")
    }

    async updateUserInfo(req, res) {
        try {
            await UserModel.updateInformationWith(req.query.uid, req.body)
            res.status(200).send("Successfully updated user information.")

        } catch (error) {
            res.status(409).send(error.message)
        }
    }

    async deleteUser(req, res) {
        try {
            await UserModel.removeUserWith(req.query.uid)
            res.status(200).send("Successfully removed user.")

        } catch (error) {
            res.status(404).send(error.message)
        }
    }

    async followUser(req, res) {
        return "TODO"
    }

    async getUsersFollowedBy(req, res) {
        return "TODO"
    }

    async getUsersFollowing(req, res) {
        return "TODO"
    }

    async unfollowUser(req, res) {
        return "TODO"
    }

    async blockUser(req, res) {
        return "TODO"
    }

    async getUsersBlockedBy(req, res) {
        return "TODO"
    }

    async getUsersBlocking(req, res) {
        return "TODO"
    }

    async unblockUser(req, res) {
        return "TODO"
    }
}

const instance = new UserController()
module.exports = instance