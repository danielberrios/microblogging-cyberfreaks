const express = require('express');
const router = express.Router()

// ROUTES + HANDLERS
const postController;

router.post('/', postController.publishPost)
router.post('/reply', postController.publishReply)
router.post('/share', postController.publishShare)
router.get('/msg/:pid', postController.getPostById)
router.get('/msg', postController.getAllPosts)

router.post('/like/:pid', postController.likePost)
router.delete('/like/remove/:pid', postController.removeLike)
router.get('/liked/:pid', postController.getUsersThatLikedPost)

router.post('/dislike/:pid', postController.dislikePost)
router.delete('/dislike/remove/:pid', postController.removeDislike)
router.get('/disliked/:pid', postController.getUsersThatDislikedPost)

export default router;