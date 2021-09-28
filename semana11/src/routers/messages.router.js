const express = require("express")
const messageController = require("../controllers/messages.controller.js")

const router = new express.Router()

router.get('/', messageController.getMessages)
router.post('/', messageController.saveMessage)

module.exports = router