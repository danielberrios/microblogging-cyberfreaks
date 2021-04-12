const PostModel = require('../models/post.model')

class PostController {
    constructor() { }

    publishPost(req, res) {
        const postData = req.body;

        PostModel.insertNewPost(postData).then(() => {
            res.status(201).send("Successfully published new post.")
        })
        .catch((error) => {
            console.log("Error: ", error)
            res.status(409).send(error.message)
        });
    }

    publishReply(req, res) {
        const replyData = req.body;

        PostModel.insertNewReply(replyData).then(() => {
            res.status(201).send("Successfully published new reply.")
        })
        .catch((error) => {
            console.log("Error: ", error)
            res.status(409).send(error.message)
        });
    }
    
    publishShare(req, res) {
        const shareData = req.body;

        PostModel.insertNewShare(shareData).then(() => {
            res.status(201).send("Successfully published new share.")
        })
        .catch((error) => {
            console.log("Error: ", error)
            res.status(409).send(error.message)
        });
    }

    getPostById(req, res) {
        const postId = req.query.post_id   

        PostModel.getSpecificPostWith(postId)
            .then((post) => {
                if(post)
                    res.status(200).json(post)
                else
                    res.status(404).send("Post not found.")
            })
            .catch((error) => {
                res.status(500).send("An error has occurred.")
            })
    }

    getListOfAllPosts(req, res) {
        //Return all posts. No parameters needed.

        PostModel.getAllPosts().then((posts) => {
            res.status(201).json(posts)
        })
        .catch((error) => {
            console.log("Error: ", error)
            res.status(409).send(error.message)
        });
    }

    likePost(req, res) {
        const [post_id, uid] = [req.query.post_id, req.body.uid]

        PostModel.insertNewLike(post_id, uid).then(() => {
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
        const [uid, post_id] = [req.body.uid, req.query.post_id]

        PostModel.handleUnlike(uid, post_id)
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
        const post_id = req.query.post_id  

        PostModel.getUsersThatLikedAPost(post_id)
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

module.exports = new PostController()