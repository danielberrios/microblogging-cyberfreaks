const connect = require('./dbconfig')
const UserModel = require('./user.model')

class FollowModel {
    constructor() { }

    async registerNewFollower(followerId, followedId) {
        let connection = connect(),
            values = [followerId, followedId],
            query = `INSERT INTO follows (follower_id, followed_id) VALUES ($1, $2)`

        return connection.query(query, values)
            .then(() => {
                return true
            })
            .catch((error) => {
                console.error(error)
                throw error
            })
            .finally(() => connection.end())
    }

    async getUsersFollowedBy(followerId) {
        if(! await UserModel.getSpecificUserWith(followerId))
            throw new Error("Follower ID does not exist in database.")

        let connection = connect(),
            values = [followerId],
            query = `SELECT first_name, last_name, username
                     FROM users AS U INNER JOIN follows AS F ON F.followed_id=U.uid
                     WHERE F.follower_id = $1`

        return connection.query(query, values)
            .then((result) => {
                return result.rows                
            })
            .catch((error) => {
                console.error(error)
                throw error
            })
            .finally(() => connection.end())
    }

    async getUsersWhoAreFollowing(uid) {
        if(! await UserModel.getSpecificUserWith(uid))
            throw new Error("User ID does not exist in database.")

        let connection = connect(),
            values = [uid],
            query = `SELECT first_name, last_name, username
                     FROM users AS U INNER JOIN follows AS F ON F.follower_id=U.uid
                     WHERE F.followed_id = $1`

        return connection.query(query, values)
            .then((result) => {
                return result.rows
            })
            .catch((error) => {
                console.error(error)
                throw error
            })
            .finally(() => connection.end())
    }

    async handleUnfollow(unFollowerId, unFollowedId) {
        if (! await UserModel.getSpecificUserWith(unFollowerId))
            throw new Error("Follower ID does not exist in database.")
        
        if(! await UserModel.getSpecificUserWith(unFollowedId))
            throw  new Error("Followed ID does not exist in database.")
            
        let connection = connect(),
            values = [unFollowerId, unFollowedId],
            query = `DELETE FROM follows WHERE follower_id=$1 AND followed_id=$2`

        return connection.query(query, values)
            .then(() => {
                return true
            })
            .catch((error) => {
                console.error(error)
                throw error
            })
            .finally(() => connection.end())
    }
}

module.exports = new FollowModel()