const express = require('express');
const router = express.Router()

// ROUTES + HANDLERS
const postController = require("../controllers/post.controller");

router.post('/', postController.publishPost)
router.post('/reply', postController.publishReply)
router.post('/share', postController.publishShare)
router.get('/:pid', postController.getPostById)
router.get('/', postController.getListOfAllPosts)

// router.post('/like/:pid', postController.likePost)
// router.delete('/like/remove/:pid', postController.removeLike)
// router.get('/liked/:pid', postController.getUsersThatLikedPost)

// router.post('/dislike/:pid', postController.dislikePost)
// router.delete('/dislike/remove/:pid', postController.removeDislike)
// router.get('/disliked/:pid', postController.getUsersThatDislikedPost)

module.exports = router;