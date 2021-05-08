const express = require('express');
const router = express.Router()

// ROUTES + HANDLERS
const LikeController = require("../controllers/like.controller");
const { interactionChecker } = require('../middleware/block.middleware')

router.post('/like/:post_id', interactionChecker, LikeController.likePost)
router.delete('/like/remove/:post_id', interactionChecker, LikeController.removeLike)
router.get('/liked/:post_id', LikeController.getUsersThatLikedPost)

module.exports = router;