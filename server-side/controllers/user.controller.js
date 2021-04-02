const UserModel = require('../models/user.model')

class UserController {
    constructor() { /* Initializes UserModel */ }

    async registerUser(req, res) {
        return "TODO"
    }

    async getAllUsers(req, res) {
        res.send(await UserModel.getListOfUsers())
    }

    async getUserById(req, res) {
        return "TODO"
    }

    async updateUserInfo(req, res) {
        return "TODO"
    }

    async deleteUser(req, res) {
        return "TODO"
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