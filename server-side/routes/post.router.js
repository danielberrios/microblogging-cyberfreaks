const express = require('express');
const router = express.Router()

// ROUTES + HANDLERS
const postController = require("../controllers/post.controller");

router.post('/', postController.publishPost)
router.post('/reply', postController.publishReply)
router.post('/share', postController.publishShare)
router.get('/post', postController.getPostById)
router.get('/', postController.getListOfAllPosts)

router.post('/like', postController.likePost)
router.delete('/like/remove', postController.removeLike)
router.get('/liked', postController.getUsersThatLikedPost)

// router.post('/dislike/:pid', postController.dislikePost)
// router.delete('/dislike/remove/:pid', postController.removeDislike)
// router.get('/disliked/:pid', postController.getUsersThatDislikedPost)

module.exports = router;