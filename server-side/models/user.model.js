const connect = require('./dbconfig')

class UserModel {
    constructor() { }

    async addNewUser(userData) {
        const {first_name, last_name, email, password, username} = userData

        let connection = connect(),
            query = `INSERT INTO users(first_name, last_name, email, password, username)
                    VALUES('${first_name}', '${last_name}', '${email}', '${password}', '${username}')`

        return connection.query(query)
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
            query = `SELECT * FROM users WHERE uid=${uid}`

        return connection.query(query)
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

        const {first_name, last_name, email, password, username} = userData

        let connection = connect(),
            query = `UPDATE users 
                        SET first_name='${first_name}',
                            last_name='${last_name}',
                            email='${email}',
                            password='${password}',
                            username='${username}'
                        WHERE uid=${uid}`

        return connection.query(query)
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
            query = `DELETE FROM users WHERE uid=${uid}`

        return connection.query(query)
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
            query = `INSERT INTO follows (follower_id, followed_id) VALUES (${followerId}, ${followedId})`

        return connection.query(query)
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
            query = `SELECT first_name, last_name, username
                     FROM users AS U INNER JOIN follows AS F ON F.followed_id=U.uid
                     WHERE F.follower_id = ${followerId}`

        return connection.query(query)
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
            query = `SELECT first_name, last_name, username
                     FROM users AS U INNER JOIN follows AS F ON F.follower_id=U.uid
                     WHERE F.followed_id = ${uid}`

        return connection.query(query)
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
            query = `DELETE FROM follows WHERE follower_id=${unFollowerId} AND followed_id=${unFollowedId}`

        return connection.query(query)
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
        query = `INSERT INTO blocks (blocker_id, blocked_id) VALUES (${blockerId}, ${blockedId})`

        return connection.query(query)
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
            query = `SELECT first_name, last_name, username
                     FROM users AS U INNER JOIN blocks AS B ON B.blocked_id=U.uid
                     WHERE B.blocker_id = ${blockerId}`

        return connection.query(query)
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
            query = `SELECT first_name, last_name, username
                     FROM users AS U INNER JOIN blocks AS B ON B.blocker_id=U.uid
                     WHERE B.blocked_id = ${uid}`

        return connection.query(query)
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
            query = `DELETE FROM blocks WHERE blocker_id=${unBlockerId} AND blocked_id=${unBlockedId}`

        return connection.query(query)
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

module.exports = new UserModel()