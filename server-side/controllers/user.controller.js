const UserModel = require('../models/user.model')

class UserController {
    constructor() { }

    registerUser(req, res) {
        const userData = req.body

        UserModel.addNewUser(userData)
            .then(() => {
                res.status(201).send("Successfully registered new user.")
            })
            .catch((error) => {
                switch(error.constraint){
                    case 'users_email_key':
                        res.status(409).send("Email already exists.")
                        break;

                    case 'users_username_key':
                        res.status(409).send("Username already exists.")
                        break;
                    
                    case 'password_min_length':
                        res.status(409).send("Password is too short.")
                        break;

                    default: 
                        res.status(500).send("Some error has occurred.")
                        break;
                }
            })
    }

    getListOfUsers(req, res) {
        UserModel.getAllUsers()
            .then((users) => { 
                // returns empty list if no users are registered.
                res.status(200).send(users) 
            })
            .catch((error) => { 
                res.status(500).send("Some error has occurred.") 
            }) 
    }

    getUserById(req, res) { 
        const userId = req.params.uid   

        UserModel.getSpecificUserWith(userId)
            .then((user) => {
                if(user)
                    res.status(200).send(user)
                else
                    res.status(404).send("User not found.")
            })
            .catch((error) => {
                res.status(500).send("An error has occurred.")
            })
    }

    updateUserInfo(req, res) {
        const [userId, userData] = [req.params.uid, req.body]

        UserModel.updateInformationWith(userId, userData)
            .then(() => {
                res.status(200).send("Successfully updated user information.")
            })
            .catch((error) => {
                if(error.message == "User not found.") { res.status(404).send(error.message); return }

                switch(error){
                    case error.constraint == 'users_email_key':
                        res.status(409).send("Email already exists.")
                        break;

                    case error.constraint == 'users_username_key':
                        res.status(409).send("Username already exists.")
                        break;
                    
                    case error.constraint == 'password_min_length':
                        res.status(409).send("Password is too short.")
                        break;

                    default: 
                        res.status(500).send("Some error has occurred.")
                        break;
                }
            })
    }

    deleteUser(req, res) {
        const userId = req.params.uid

        UserModel.removeUserWith(userId)
            .then(() => {
                res.status(200).send("Successfully removed user.")
            })
            .catch((error) => {
                res.status(500).send("Some error has occurred.")
            })
    }
}

module.exports = new UserController()