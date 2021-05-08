const express = require('express');
const router = express.Router()

const UserController = require('../controllers/user.controller.js')

// ROUTES + HANDLERS
router.post('/users', UserController.registerUser)
router.get('/users', UserController.getListOfUsers)
router.get('/users/:uid', UserController.getUserById)
router.put('/users/:uid', UserController.updateUserInfo)
router.delete('/users/:uid', UserController.deleteUser)

module.exports = router