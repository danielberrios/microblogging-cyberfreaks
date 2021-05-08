const DislikeModel = require('../models/dislike.model')

class DislikeController {
    constructor() { }

    dislikePost(req, res) {
        const [post_id, uid] = [req.params.post_id, req.body.RegisteredUser]

        DislikeModel.insertNewDislike(post_id, uid)
            .then(() => {
                res.status(201).send("Successfully published new dislike.")
            })
            .catch((error) => {
                switch (error.constraint) {
                    case 'dislikes_pkey':
                        res.status(409).send("Dislike already exists.")
                        break;

                    case 'posts_uid_fkey':
                        res.status(404).send("User doesn't exist.")
                        break;

                    case 'dislikes_post_id_fkey':
                        res.status(404).send("Post doesn't exist.")
                        break;

                    default:
                        res.status(500).send("Some error has occurred.")
                        break;
                }
            });
    }
    
    removeDislike(req, res) {
        const [uid, post_id] = [req.body.RegisteredUser, req.params.post_id]

        DislikeModel.handleUndislike(uid, post_id)
            .then(() => {
                res.status(201).send("Successfully removed dislike from the post.")
            })
            .catch((error) => {
                if(error.message == "Post ID does not exist.")
                    res.status(404).send(error.message)
                else
                    res.status(500).send("Some error has occurred.")
            })
    }

    getUsersThatDislikedPost(req, res) {
        const post_id = req.params.post_id  

        DislikeModel.getUsersThatDislikedAPost(post_id)
            .then((users) => {
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

module.exports = new DislikeController()