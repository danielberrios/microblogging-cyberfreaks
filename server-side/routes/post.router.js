const express = require('express');
const router = express.Router()

// ROUTES + HANDLERS
const postController = require("../controllers/post.controller");
const { interactionChecker } = require('../middleware/block.middleware')

router.post('/posts', postController.publishPost)
router.post('/reply', interactionChecker, postController.publishReply)
router.post('/share', interactionChecker, postController.publishShare)
router.get('/msg/:post_id', postController.getPostById)
router.get('/msg', postController.getListOfAllPosts)

module.exports = router;