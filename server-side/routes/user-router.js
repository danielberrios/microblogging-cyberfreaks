const express = require('express');
const router = express.Router()

// ROUTES + HANDLERS
const userController;

router.post('/', userController.registerUser)
router.get('/', userController.getAllUsers)
router.get('/:uid', userController.getUserById)
router.put('/:uid', userController.updateUserInfo)
router.delete('/:uid', userController.deleteUser)

router.post('/follow/:uid', userController.followUser);
router.get('/followedBy/:uid', userController.getUsersFollowedBy)
router.get('/following/:uid', userController.getUsersFollowing)
router.post('/unfollow/:uid', userController.unfollowUser)

router.post('/block/:uid', userController.blockUser)
router.get('/blockedBy/:uid', userController.getUsersBlockerBy)
router.get('/blocking/:uid', userController.getUsersBlocking)
router.post('/unblock/:uid', userController.unblockUser)

export default router;