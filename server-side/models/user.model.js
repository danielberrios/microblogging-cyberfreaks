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
                    switch(error.constraint){
                        case 'users_email_key':
                            throw new Error("Email already exists.")

                        case 'users_username_key':
                            throw new Error("Username already exists.")
                        
                        case 'password_min_length':
                            throw new Error("Password is too short.")

                        default: 
                            throw new Error("Some error has occurred.")
                    }
                })
                .finally(() => connection.end())
    }

    async getListOfUsers() {
        let connection = connect(),
            query = `SELECT * FROM users`

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

    async getSpecificUserWith(uid) {
        let connection = connect(),
            query = `SELECT * FROM users WHERE uid=${uid}`

        return connection.query(query)
            .then(result => {
                return result.rows[0]
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => connection.end())
    }

    async updateInformationWith(uid, userData) {
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
                switch(error.constraint){
                    case 'users_email_key':
                        throw new Error("Email already exists.")

                    case 'users_username_key':
                        throw new Error("Username already exists.")
                    
                    case 'password_min_length':
                        throw new Error("Password is too short.")

                    default: 
                        throw new Error("Some error has occurred.")
                }
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
                throw new Error("Some error has occurred.")
            })
            .finally(() => connection.end())
    }
}

const instance = new UserModel()
module.exports = instance