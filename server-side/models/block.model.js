const connect = require('./dbconfig')
const UserModel = require('./user.model.js')

class BlockModel {
    constructor() { }
    
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
        if(! await UserModel.getSpecificUserWith(blockerId))
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
        if(! await UserModel.getSpecificUserWith(uid))
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
        if (! await UserModel.getSpecificUserWith(unBlockerId))
            throw new Error("Blocker ID does not exist in database.")
        
        if(! await UserModel.getSpecificUserWith(unBlockedId))
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
}

module.exports = new BlockModel()