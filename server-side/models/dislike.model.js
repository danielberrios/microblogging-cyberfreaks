const connect = require('./dbconfig')
const PostModel = require('./post.model.js')

class DislikeModel {
    constructor() { }
    
    async insertNewDislike(post_id, uid) {
        let connection = connect(),
            query = `INSERT INTO dislikes(uid, post_id)
                    VALUES($1, $2);`,
            values = [uid, post_id];

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

    async handleUndislike(uid, post_id) {
        if(! await PostModel.getSpecificPostWith(post_id))
            throw new Error("Post ID does not exist.")

        let connection = connect(),
            query = 'DELETE FROM dislikes WHERE uid=$1 AND post_id=$2',
            values = [uid, post_id]

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

    async getUsersThatDislikedAPost(post_id){
        if(! await PostModel.getSpecificPostWith(post_id))
            throw new Error("Post ID does not exist.")

        let connection = connect(),
            values = [post_id],
            query = `SELECT first_name, last_name, username
                    FROM users AS U INNER JOIN dislikes AS D ON D.uid=U.uid
                    WHERE post_id = $1`

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

}

module.exports = new DislikeModel()