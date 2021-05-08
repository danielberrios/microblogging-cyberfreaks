const FollowModel = require('../models/follow.model')

class FollowController {
    constructor() { }

    followUser(req, res) {
        const [followerId, followedId] = [req.body.RegisteredUser, req.params.uid]

        FollowModel.registerNewFollower(followerId, followedId)
            .then(() => {
                res.status(201).send("Successfully registered new follower.")
            })
            .catch((error) => {
                switch(error.constraint){
                    case 'follows_follower_id_fkey':
                        res.status(404).send("Follower ID does not exist in database.")
                        break;

                    case 'follows_followed_id_fkey':
                        res.status(404).send("Followed ID does not exist in database.")
                        break;

                    case 'follows_pkey':
                        res.status(409).send("User already followed.")
                        break;
                        
                    default: 
                        res.status(500).send(error.message)
                        break;
                }
            })
    }

    getUsersFollowedBy(req, res) {
        const followerId = req.params.uid 

        FollowModel.getUsersFollowedBy(followerId)
            .then((users) => {
                res.status(200).send(users)
            })
            .catch((error) => {
                if(error.message == "Follower ID does not exist in database.")
                    res.status(404).send(error.message)

                else
                    res.status(500).send(error.message)
            })
    }

    getUsersFollowing(req, res) {
        const userId = req.params.uid

        FollowModel.getUsersWhoAreFollowing(userId)
            .then((users) => {
                res.status(200).send(users)
            })
            .catch((error) => {
                if(error.message == "User ID does not exist in database.")
                    res.status(404).send(error.message)

                else
                    res.status(500).send(error.message)
            })
    }

    unfollowUser(req, res) {
        const [unFollowerId, unFollowedId] = [req.body.RegisteredUser, req.params.uid]

        FollowModel.handleUnfollow(unFollowerId, unFollowedId)
            .then(() => {
                res.status(201).send("Successfully unfollowed user.")
            })
            .catch((error) => {
                if(error.message == "Follower ID does not exist in database." || error.message == "Followed ID does not exist in database.")
                    res.status(404).send(error.message)
                
                else
                    res.status(500).send(error.message)
            })
    }
}

module.exports = new FollowController()