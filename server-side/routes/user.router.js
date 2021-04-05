const express = require('express');
const router = express.Router()

const UserController = require('../controllers/user.controller.js')

// ROUTES + HANDLERS
router.post('/', UserController.registerUser)
router.get('/', UserController.getAllUsers)
router.get('/user', UserController.getUserById)
router.put('/user', UserController.updateUserInfo)
router.delete('/user', UserController.deleteUser)

router.post('/follow/:uid', UserController.followUser);
router.get('/followedBy/:uid', UserController.getUsersFollowedBy)
router.get('/following/:uid', UserController.getUsersFollowing)
router.post('/unfollow/:uid', UserController.unfollowUser)

router.post('/block/:uid', UserController.blockUser)
router.get('/blockedBy/:uid', UserController.getUsersBlockedBy)
router.get('/blocking/:uid', UserController.getUsersBlocking)
router.post('/unblock/:uid', UserController.unblockUser)

module.exports = router