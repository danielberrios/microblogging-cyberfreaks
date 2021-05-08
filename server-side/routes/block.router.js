const express = require('express');
const router = express.Router()

const BlockController = require('../controllers/block.controller.js')

// ROUTES + HANDLERS
router.post('/block/:uid', BlockController.blockUser)
router.get('/blockedBy/:uid', BlockController.getUsersBlockedBy)
router.get('/blocking/:uid', BlockController.getUsersBlocking)
router.post('/unblock/:uid', BlockController.unblockUser)

module.exports = router