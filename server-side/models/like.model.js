const connect = require('./dbconfig')
const PostModel = require('./post.model')

class LikeModel {
    constructor() { }

    async insertNewLike(post_id, uid) {
        let connection = connect(),
            query = `INSERT INTO likes(uid, post_id)
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

    async handleUnlike(uid, post_id) {
        if(! await PostModel.getSpecificPostWith(post_id))
            throw new Error("Post ID does not exist.")

        let connection = connect(),
            query = 'DELETE FROM likes WHERE uid=$1 AND post_id=$2',
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

    async getUsersThatLikedAPost(post_id){
        if(! await PostModel.getSpecificPostWith(post_id))
            throw new Error("Post ID does not exist.")

        let connection = connect(),
            values = [post_id],
            query = `SELECT first_name, last_name, username
                    FROM users AS U INNER JOIN likes AS L ON L.uid=U.uid
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

module.exports = new LikeModel()