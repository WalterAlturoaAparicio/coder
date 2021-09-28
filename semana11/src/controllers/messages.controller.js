const messagesService = require("../services/messages.service.js")

module.exports = {
    saveMessage: async (req, res) => {
        const { body } = req;
        try {
            messagesService.saveMessage(body)
            res.status(200).send('mensaje recibido')
        } catch (error) {
            res.status(400).send(error.message)
        }
    },
    getMessages: async (req, res)=> {
        try {
            const messages = await messagesService.getMessages()
            res.status(200).json({ messages });
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}