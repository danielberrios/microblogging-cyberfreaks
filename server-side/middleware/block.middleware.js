const connect = require('../models/dbconfig')

const verifyUsers = async (user1, user2) => {
    let connection = connect(),
    values = [user1, user2],
    query = `SELECT * FROM blocks WHERE (blocker_id, blocked_id) = ($1, $2) 
                OR (blocker_id, blocked_id) = ($2, $1);`

    return connection.query(query, values)
        .then(result => {
            if(result.rows.length != 0)
                return false;

            else
                return true
        })
        .catch((error) => {
            console.error(error)
            throw error
        })
}

const followChecker = async (req, res, next) => {
    const [user1, user2] = [req.params.uid, req.body.RegisteredUser]

    return verifyUsers(user1, user2)
        .then(result => {
            if(result)
                return next()
            
            else {
                return res.status(405).send("Can't perform operation on blocked user. This may also mean that user is blocking you.")
            }
        })
        .catch((error) => {
            return res.status(500).send(error.message)
        })
}

const interactionChecker = async (req, res, next) => {
    let user1 = req.body.RegisteredUser,
        post_id;

    if(req.body.hasOwnProperty('sharing'))
        post_id = req.body.sharing

    else if(req.body.hasOwnProperty('replyingto'))
        post_id = req.body.replyingto

    else
        post_id = req.params.post_id

    let connection = connect(),
        query = `SELECT uid FROM posts NATURAL INNER JOIN users WHERE post_id=$1`,
        values = [post_id]

    return connection.query(query, values)
        .then(async (user2) => {
            return verifyUsers(user1, user2.rows[0].uid)
                .then(result => {
                    if(result)
                        return next()
                    
                    else {
                        return res.status(405).send("Can't perform operation on blocked user. This may also mean that user is blocking you.")
                    }
                })
                .catch((error) => {
                    throw error
                })
        })
        .catch((error) => {
            return res.status(500).send(error.message)
        })
}

module.exports = {
    followChecker,
    interactionChecker
}