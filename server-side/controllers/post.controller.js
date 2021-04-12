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
    
    likePost(req, res) {
        const likeData = req.body;

        PostModel.insertNewLike(likeData).then(() => {
            res.status(201).send("Successfully published new like.")
        })
        .catch((error) => {
            console.log("Error: ", error)
            res.status(409).send(error.message)
        });
    }
    
    removeLike(req, res) {
        const [uid, post_id] = [req.body.uid, req.query.post_id]

        PostModel.handleUnlike(uid, post_id)
        .then(() => {
            res.status(201).send("Successfully removed like from the post.")
        })
        .catch((error) => {
            if(error.message == "Post ID does not exist.") //Falta el otro message del handler
                res.status(404).send(error.message)
            else
                res.status(500).send("An error has ocurred.")
        })
    }

    getUsersThatLikedPost(req, res) {
        //Not sure about this, still needs verification
        const post_id = req.params.pid   

        console.log("PostId: ", post_id)

        PostModel.getUsersThatLikedAPost(post_id)
            .then((user) => {
                if(user)
                    res.status(200).json(user)
                else
                    res.status(404).send("User not found.")
            })
            .catch((error) => {
                res.status(500).send("An error has occurred.")
            })
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
        const postId = req.params.pid   

        console.log("PostId: ", postId)

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

    unlik
}

module.exports = new PostController()