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
        const postId = req.params.post_id   

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
}

module.exports = new PostController()