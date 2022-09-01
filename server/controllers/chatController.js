const chatroomModel = require('../models/chatroom')

module.exports = {
    createChatroom: async (req, res) => {
        // user gave invalid input -> bad req -> 400

        // user login fail, or not authenticated -> 401

        // resource not found -> 404

        // server problem -> 500, 501

        // successful -> 200

        // created -> 201

        try {
            await chatroomModel.create(req.body)
        } catch (err) {
            res.status(500)
            return res.json({error: "Failed to create chatroom"})
        }

        return res.status(201).json()
    },

    listChatroom: async (req, res) => {
        let chatrooms = []
        
        // chatroomModel.watch().on("change", (data) => {
        //     console.log( "watchdata here", { data } )
        // })
        console.log('listChatroom ran')

        try {
            chatrooms = await chatroomModel.find().exec()
        } catch (err) {
            res.status(500)
            return res.json({error: "Failed to show chatrooms"})
        }

        return res.json(chatrooms)
    },

    // show: async (req, res) => {
    //     try {
    //         const animalId = req.params.id
    //         // -__v means minus, the field, exclude the version field
    //         // or -name -species etc.
    //         const animals = await animalModel.findById(animalId).select('-__v')
    //         return res.json(animals)
    //     } catch (err) {
    //         res.status(500)
    //         return res.json({error: `Fail to get animal of id ${animalId}`})
    //     }
    // },
}