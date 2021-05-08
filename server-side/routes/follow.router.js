const express = require('express');
const router = express.Router()

const FollowController = require('../controllers/follow.controller')
const { followChecker } = require('../middleware/block.middleware')

// ROUTES + HANDLERS
router.post('/follow/:uid', followChecker, FollowController.followUser);
router.get('/followedBy/:uid', FollowController.getUsersFollowedBy)
router.get('/follows/:uid', FollowController.getUsersFollowing)
router.post('/unfollow/:uid', followChecker, FollowController.unfollowUser)

module.exports = router