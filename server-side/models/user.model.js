const connect = require('./dbconfig')

class UserModel {
    constructor() { }

    async addNewUser(userData) {
        // Unpack values using object destructuring.
        const {first_name, last_name, email, password, username} = userData

        let connection = connect(),
            values = [first_name, last_name, email, password, username],
            query = `INSERT INTO users(first_name, last_name, email, password, username)
                    VALUES($1, $2, $3, $4, $5)`

        return connection.query(query, values)
            .then(() => {
                return true
            })
            .catch(error => {
                console.error(error)
                throw error
            })
            .finally(() => connection.end())
    }

    async getAllUsers() {
        let connection = connect(),
            query = `SELECT * FROM users`

        return connection.query(query)
            .then(result => {
                return result.rows
            })
            .catch(error => {
                console.error(error)
                throw error
            })
            .finally(() => connection.end())
    }

    async getSpecificUserWith(uid) {
        let connection = connect(),
            values = [uid],
            query = `SELECT * FROM users WHERE uid=$1`

        return connection.query(query, values)
            .then(result => {
                return result.rows[0]
            })
            .catch(error => {
                console.error(error)
                throw error
            })
            .finally(() => connection.end())
    }

    async updateInformationWith(uid, userData) {
        // Verify if user exists.
        if(! await this.getSpecificUserWith(uid))
            throw new Error("User not found.")

        // Unpack values using object destructuring.
        const {first_name, last_name, email, password, username} = userData

        let connection = connect(),
            values = [first_name, last_name, email, password, username, uid],
            query = `UPDATE users 
                        SET first_name=$1,
                            last_name=$2,
                            email=$3,
                            password=$4,
                            username=$5
                        WHERE uid=$6`

        return connection.query(query, values)
            .then(() => {
                return true
            })
            .catch(error => {
                console.error(error)
                throw error
            })
            .finally(() => connection.end())
    }

    async removeUserWith(uid) {
        let connection = connect(),
            values = [uid],
            query = `DELETE FROM users WHERE uid=$1`

        return connection.query(query, values)
            .then(() => {
                return true
            })
            .catch(error => {
                console.error(error)
                throw error
            })
            .finally(() => connection.end())
    }

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
        if(! await this.getSpecificUserWith(followerId))
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
        if(! await this.getSpecificUserWith(uid))
            throw new Error("User ID does not exist in database.")

        let connection = connect(),
            values = [uid]
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
        if (! await this.getSpecificUserWith(unFollowerId))
            throw new Error("Follower ID does not exist in database.")
        
        if(! await this.getSpecificUserWith(unFollowedId))
            throw  new Error("Followed ID does not exist in database.")
            
        let connection = connect(),
            values = [unFollowerId, unFollowedId]
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

    async registerBlock(blockerId, blockedId){
        let connection = connect(),
            values = [blockerId, blockedId],
            query = `INSERT INTO blocks (blocker_id, blocked_id) VALUES ($1, $2)`

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

    async getUsersBlockedBy(blockerId) {
        if(! await this.getSpecificUserWith(blockerId))
            throw new Error("Blocker ID does not exist in database.")

        let connection = connect(),
            values = [blockerId],
            query = `SELECT first_name, last_name, username
                     FROM users AS U INNER JOIN blocks AS B ON B.blocked_id=U.uid
                     WHERE B.blocker_id = $1`

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

    async getUsersWhoAreBlocking(uid) {
        if(! await this.getSpecificUserWith(uid))
            throw new Error("User ID does not exist in database.")

        let connection = connect(),
            values = [uid],
            query = `SELECT first_name, last_name, username
                     FROM users AS U INNER JOIN blocks AS B ON B.blocker_id=U.uid
                     WHERE B.blocked_id = $1`

        return connection.query(query, values)
            .then((result) => {
                return result.rows
            })
            .catch((error) => {
                console.error(error)
                throw new Error("Some error has occurred.")
            })
            .finally(() => connection.end())
    }

    async handleUnblock(unBlockerId, unBlockedId) {
        if (! await this.getSpecificUserWith(unBlockerId))
            throw new Error("Blocker ID does not exist in database.")
        
        if(! await this.getSpecificUserWith(unBlockedId))
            throw  new Error("Blocked ID does not exist in database.")
            
        let connection = connect(),
            values = [unBlockerId, unBlockedId],
            query = `DELETE FROM blocks WHERE blocker_id=$1 AND blocked_id=$2`

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

    async getUsersLikedBy(uid){
        if(! await this.getSpecificUserWith(uid))
            throw new Error("User ID does not exist in databse.")

        let connection = connect(),
            values = [uid],
            query = `SELECT first_name, last_name, username
                    FROM users AS U INNER JOIN likes AS L ON L.uid=U.uid
                    WHERE L.uid = $1`
        return connection.query(query, values)
            .then((result) => {
                return result.rows
            })
            .catch((error) => {
                console.error(error)
                throw new Error("Some error has occurred.")
            })
            .finally(() => connection.end())
    }
}

module.exports = new UserModel()