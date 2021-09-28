const db =  require('../DB/dbMessages.js');
module.exports = {
    saveMessage: async (data)=> {
        try {
            await db('mensajes').insert(data)
            return
        } catch (error) {
            throw new Error(error)   
        }
    },

    getMessages: async ()=> {
        try {
            const messages = await db('mensajes').select()
            return messages
        } catch (error) {
            throw new Error(error)  
        }
    }
}
