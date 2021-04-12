const connect = require('./dbconfig')

class PostModel {
    constructor() { }

    async insertNewPost(postData) {
        console.log(postData)
        const { uid, message } = postData

        let connection = connect(),
            query = `INSERT INTO posts(uid, message)
                    VALUES($1, $2)`,
            values = [uid, message];


        return connection.query(query, values)
            .then(() => {
                return true
            })
            .catch(error => {
                console.error(error)
                switch (error.constraint) {
                    case 'posts_uid_fkey':
                        throw new Error("User doesn't exist.")
                    default:
                        throw new Error("Some error has occurred.")
                }
            })
            .finally(() => connection.end())
    }

    async insertNewReply(replyData) {
        console.log(replyData)
        const { uid, post_id, message } = replyData

        let connection = connect(),
            query = `INSERT INTO replies(uid, post_id, message)
                    VALUES($1, $2, $3);`,
            values = [uid, post_id, message];

        return connection.query(query, values)
            .then(() => {
                return true
            })
            .catch(error => {
                console.error(error)
                switch (error.constraint) {
                    case 'posts_uid_fkey':
                        throw new Error("User doesn't exist.")
                    case 'replies_post_id_fkey':
                        throw new Error("Post doesn't exist.")
                    default:
                        throw new Error("Some error has occurred.")
                }
            })
            .finally(() => connection.end())
    }

    async insertNewShare(shareData) {

        const { uid, post_id } = shareData

        let connection = connect(),
            query = `INSERT INTO shares(uid, post_id)
                    VALUES($1, $2);`,
            values = [uid, post_id];

        return connection.query(query, values)
            .then(() => {
                return true
            })
            .catch(error => {
                console.error(error)
                switch (error.constraint) {
                    case 'posts_uid_fkey':
                        throw new Error("User doesn't exist.")
                    case 'shares_post_id_fkey':
                        throw new Error("Post doesn't exist.")
                    default:
                        throw new Error("Some error has occurred.")
                }
            })
            .finally(() => connection.end())
    }

    async getAllPosts() {
        let connection = connect(),
            query = `SELECT * FROM posts`

        return connection.query(query)
            .then(result => {
                return result.rows
            })
            .catch(error => {
                console.error(error)
                throw new Error("Some error has occurred.")
            })
            .finally(() => connection.end())
    }

    async getSpecificPostWith(pid) {
        let connection = connect(),
            query = `SELECT * FROM posts WHERE post_id=$1`,
            values = [pid]

        return connection.query(query, values)
            .then(result => {
                return result.rows[0]
            })
            .catch(error => {
                console.error(error)
                throw new Error("Some error has occurred.")
            })
            .finally(() => connection.end())
    }

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
        if(! await this.getSpecificPostWith(post_id))
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
        if(! await this.getSpecificPostWith(post_id))
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

module.exports = new PostModel()