const express = require('express');
const router = express.Router()

// ROUTES + HANDLERS
const DislikeController = require("../controllers/dislike.controller");
const { interactionChecker } = require('../middleware/block.middleware')

router.post('/unlike/:post_id', interactionChecker, DislikeController.dislikePost)
router.delete('/unlike/remove/:post_id', interactionChecker, DislikeController.removeDislike)
router.get('/unliked/:post_id', DislikeController.getUsersThatDislikedPost)

module.exports = router;