const chatroomModel = require('../models/chatroom')
const messagesModel = require('../models/messages')

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

    showChatroom: async (req, res) => {
        // chatroomModel.watch().on("change", (data) => {
        //     console.log( "watchdata here", { data } )
        // })
        console.log('showChatroom ran')
        let chatroom = {}
        try {
            const chatId = req.params.id
            console.log('chatId',chatId)
            chatroom = await chatroomModel.findById(chatId);
        } catch (err) {
            res.status(500)
            return res.json({error: "Failed to show chat"})
        }
        return res.json(chatroom)
    },

    listMessage: async (req, res) => {
        let messages = []
        
        // chatroomModel.watch().on("change", (data) => {
        //     console.log( "watchdata here", { data } )
        // })

        try {
            messages = await messagesModel.find({ chatId : req.params.id }).exec()
            // need to sort messages here by timestamp
            // and also install luxon to post currentTimenNow
        } catch (err) {
            res.status(500)
            return res.json({error: "Failed to list messages"})
        }

        return res.json(messages)
    },

    createMessage: async (req, res) => {
        console.log('create message ran')
        try {
            await messagesModel.create(req.body)
        } catch (err) {
            res.status(500)
            return res.json({error: "Failed to send message"})
        }

        return res.status(201).json()
    },
}