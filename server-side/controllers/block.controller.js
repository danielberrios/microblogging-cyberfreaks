const BlockModel = require('../models/block.model.js')

class BlockController {
    constructor() { }

    blockUser(req, res) {
        const [blockerId, blockedId] = [req.body.RegisteredUser, req.params.uid]

        BlockModel.registerBlock(blockerId, blockedId)
            .then(() => {
                res.status(201).send("Successfully blocked user.")
            })
            .catch((error) => {
                switch(error.constraint){
                    case 'blocks_blocker_id_fkey':
                        res.status(404).send("Blocker ID does not exist in database.")
                        break;

                    case 'blocks_blocked_id_fkey':
                        res.status(404).send("Blocked ID does not exist in database.")
                        break;
                        
                    case 'blocks_pkey':
                        res.status(409).send("User already blocked.")
                        break;

                    default: 
                        res.status(500).send("Some error has occurred.")
                        break;
                }
            })
    }

    getUsersBlockedBy(req, res) {
        const blockerId = req.params.uid 

        BlockModel.getUsersBlockedBy(blockerId)
            .then((users) => {
                res.status(200).send(users)
            })
            .catch((error) => {
                if (error.message == "Blocker ID does not exist in database.")
                    res.status(404).send(error.message)

                else
                    res.status(500).send("Some error has occurred.")
            })
    }

    getUsersBlocking(req, res) {
        const userId = req.params.uid

        BlockModel.getUsersWhoAreBlocking(userId)
            .then((users) => {
                res.status(200).send(users)
            })
            .catch((error) => {
                if(error.message == "User ID does not exist in database.")
                    res.status(404).send(error.message)

                else 
                    res.status(500).send("some error has occurred.")
            })
    }

    unblockUser(req, res) {
        const [unBlockerId, unBlockedId] = [req.body.RegisteredUser, req.params.uid]

        BlockModel.handleUnblock(unBlockerId, unBlockedId)
            .then(() => {
                res.status(201).send("Successfully unblocked user.")
            })
            .catch((error) => {
                if(error.message == "Blocker ID does not exist in database." || error.message == "Blocked ID does not exist in database.")
                    res.status(404).send(error.message)

                else 
                    res.status(500).send("Some error has occurred.")
            })
    }
}

module.exports = new BlockController()