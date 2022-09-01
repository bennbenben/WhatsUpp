const express = require('express')
const chatController = require('../controllers/chatController')

const router = express.Router()

// GET /api/v2/chats
router.get('/', chatController.listChatroom)

// GET /api/v1/animals/:animalID
// router.get('/:id', animalController.show)

// POST /api/v2/chats
router.post('/', chatController.createChatroom)

module.exports = router
