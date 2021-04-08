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
}

module.exports = new PostModel()