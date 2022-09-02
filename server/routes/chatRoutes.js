const express = require('express')
const chatController = require('../controllers/chatController')

const router = express.Router()

// GET /api/v2/chats
router.get('/', chatController.listChatroom)

// POST /api/v2/chats
router.post('/', chatController.createChatroom)

// GET /api/v2/chats/:id
router.get('/:id', chatController.showChatroom)

// POST /api/v2/chats/:id/message
router.get('/:id/message', chatController.listMessage)

// POST /api/v2/chats/:id/message
router.post('/:id/message', chatController.createMessage)



module.exports = router
