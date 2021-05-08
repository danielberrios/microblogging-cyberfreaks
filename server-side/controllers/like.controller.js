const LikeModel = require('../models/like.model')

class LikeController {
    constructor() { }

    likePost(req, res) {
        const [post_id, uid] = [req.params.post_id, req.body.RegisteredUser]

        LikeModel.insertNewLike(post_id, uid).then(() => {
            res.status(201).send("Successfully published new like.")
        })
        .catch((error) => {
            switch (error.constraint) {
                case 'likes_pkey':
                    res.status(409).send("Like already exists.")
                    break;

                case 'posts_uid_fkey':
                    res.status(404).send("User doesn't exist.")
                    break;

                case 'likes_post_id_fkey':
                    res.status(404).send("Post doesn't exist.")
                    break;

                default:
                    res.status(500).send("Some error has occurred.")
                    break;
            }
        });
    }
    
    removeLike(req, res) {
        const [uid, post_id] = [req.body.RegisteredUser, req.params.post_id]

        LikeModel.handleUnlike(uid, post_id)
        .then(() => {
            res.status(201).send("Successfully removed like from the post.")
        })
        .catch((error) => {
            if(error.message == "Post ID does not exist.")
                res.status(404).send(error.message)
            else
                res.status(500).send("Some error has occurred.")
        })
    }

    getUsersThatLikedPost(req, res) {
        const post_id = req.params.post_id  

        LikeModel.getUsersThatLikedAPost(post_id)
            .then((users) => {
                // If users is empty, then no users has liked the post.
                res.status(201).send(users)
            })
            .catch((error) => {
                if(error.message == "Post ID does not exist.")
                    res.status(404).send(error.message)
                else
                    res.status(500).send("Some error has occurred.")
            })
    }

}

module.exports = new LikeController()