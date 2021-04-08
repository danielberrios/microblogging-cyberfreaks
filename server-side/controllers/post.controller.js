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
        return "TODO"
    }

    getPostById(req, res) {
        return "TODO"
    }

    getAllPosts(req, res) {
        return "TODO"
    }
}

module.exports = new PostController()