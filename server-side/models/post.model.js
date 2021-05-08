const connect = require('./dbconfig')

class PostModel {
    constructor() { }

    async insertNewPost(postData) {
        console.log(postData)
        const { RegisteredUser, Text } = postData

        let connection = connect(),
            query = `INSERT INTO posts(uid, message)
                    VALUES($1, $2)`,
            values = [RegisteredUser, Text];


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
        const { RegisteredUser, replyingto, Text } = replyData

        let connection = connect(),
            query = `INSERT INTO replies(uid, post_id, message)
                    VALUES($1, $2, $3);`,
            values = [RegisteredUser, replyingto, Text];

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

        const { RegisteredUser, sharing, message } = shareData

        let connection = connect(),
            query = `INSERT INTO shares(uid, post_id, message)
                    VALUES($1, $2, $3);`,
            values = [RegisteredUser, sharing, message];

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
}

module.exports = new PostModel()