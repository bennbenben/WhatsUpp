const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    }
})

const Messages = mongoose.model('messages', messageSchema)

module.exports = Messages
