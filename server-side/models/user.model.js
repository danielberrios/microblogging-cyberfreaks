const connect = require('./dbconfig')

class UserModel {
    constructor() { }

    async getListOfUsers() {
        let connection = connect(),
            query = `SELECT * FROM users`

        return connection.query(query)
            .then(result => {
                return result.rows
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => connection.end())
    }
}

const instance = new UserModel()

module.exports = instance