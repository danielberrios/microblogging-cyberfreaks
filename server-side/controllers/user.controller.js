const UserModel = require('../models/user.model')

class UserController {
    constructor() { }

    registerUser(req, res) {
        const userData = req.body

        UserModel.addNewUser(userData)
            .then(() => {
                res.status(201).send("Successfully registered new user.")
            })
            .catch((error) => {
                res.status(409).send(error.message)
            })
    }

    getListOfUsers(req, res) {
        UserModel.getAllUsers()
            .then((users) => { 
                res.status(200).send(users) 
            })
            .catch((error) => { 
                res.status(404).send("Resources not found.") 
            }) 
    }

    getUserById(req, res) { 
        const userId = req.query.uid   

        UserModel.getSpecificUserWith(userId)
            .then((user) => {
                if(user)
                    res.status(200).send(user)
                else
                    res.status(404).send("User not found.")
            })
            .catch((error) => {
                res.status(500).send("An error has occurred.")
            })
    }

    updateUserInfo(req, res) {
        const [userId, userData] = [req.query.uid, req.body]

        UserModel.updateInformationWith(userId, userData)
            .then(() => {
                res.status(200).send("Successfully updated user information.")
            })
            .catch((error) => {
                res.status(409).send(error.message)
            })
    }

    deleteUser(req, res) {
        const userId = req.query.uid

        UserModel.removeUserWith(userId)
            .then(() => {
                res.status(200).send("Successfully removed user.")
            })
            .catch((error) => {
                res.status(500).send(error.message)
            })
    }

    followUser(req, res) {
        const [followerId, followedId] = [req.body.follower, req.query.uid]

        UserModel.registerNewFollower(followerId, followedId)
            .then(() => {
                res.status(201).send("Successfully registered new follower.")
            })
            .catch((error) => {
                res.status(404).send(error.message)
            })
    }

    getUsersFollowedBy(req, res) {
        const followerId = req.query.uid 

        UserModel.getUsersFollowedBy(followerId)
            .then((users) => {
                res.status(200).send(users)
            })
            .catch((error) => {
                res.status(404).send(error.message)
            })
    }

    getUsersFollowing(req, res) {
        const userId = req.query.uid

        UserModel.getUsersWhoAreFollowing(userId)
            .then((users) => {
                res.status(200).send(users)
            })
            .catch((error) => {
                res.status(404).send(error.message)
            })
    }

    unfollowUser(req, res) {
        const [unFollowerId, unFollowedId] = [req.body.unfollower, req.query.uid]

        UserModel.handleUnfollow(unFollowerId, unFollowedId)
            .then(() => {
                res.status(201).send("Successfully unfollowed user.")
            })
            .catch((error) => {
                res.status(500).send("Some error has occurred.")
            })
    }

    blockUser(req, res) {
        const [blockerId, blockedId] = [req.body.blocker, req.query.uid]

        UserModel.registerBlock(blockerId, blockedId)
            .then(() => {
                res.status(201).send("Successfully blocked user.")
            })
            .catch((error) => {
                switch(error.constraint){
                    case 'blocks_blocker_id_fkey':
                        res.status(404).send("Blocker ID does not exist in database.")

                    case 'blocks_blocked_id_fkey':
                        res.status(404).send("Blocked ID does not exist in database.")
                        
                    default: 
                        res.status(500).send("Some error has occurred.")
                }
            })
    }

    getUsersBlockedBy(req, res) {
        const blockerId = req.query.uid 

        UserModel.getUsersBlockedBy(blockerId)
            .then((users) => {
                res.status(200).send(users)
            })
            .catch((error) => {
                res.status(404).send(error.message)
            })
    }

    getUsersBlocking(req, res) {
        const userId = req.query.uid

        UserModel.getUsersWhoAreBlocking(userId)
            .then((users) => {
                res.status(200).send(users)
            })
            .catch((error) => {
                res.status(404).send(error.message)
            })
    }

    unblockUser(req, res) {
        const [unBlockerId, unBlockedId] = [req.body.unblocker, req.query.uid]

        UserModel.handleUnblock(unBlockerId, unBlockedId)
            .then(() => {
                res.status(201).send("Successfully unblocked user.")
            })
            .catch((error) => {
                res.status(500).send("Some error has occurred.")
            })
    }
}

module.exports = new UserController()