const connect = require('./dbconfig')

class UserModel {
    constructor() { }

    async addNewUser(userData) {
        // Unpack values using object destructuring.
        const {first_name, last_name, email, password, username} = userData

        let connection = connect(),
            values = [first_name, last_name, email, password, username],
            query = `INSERT INTO users(first_name, last_name, email, password, username)
                    VALUES($1, $2, $3, crypt($4, gen_salt('bf')), $5)`

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
                            password=crypt($4, gen_salt('bf')),
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
}

module.exports = new UserModel()