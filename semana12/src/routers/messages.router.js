import express from "express"
import { messagesController } from "../controllers/index.js"

const router = new express.Router()

router.get('/', messagesController.getMessages)
router.post('/', messagesController.saveMessage)

export { router }