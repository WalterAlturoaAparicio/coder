const db =  require('../DB/dbProducts.js');
module.exports = {
    saveProduct: async (data)=> {
        try {
            await db('productos').insert(data)
            return
        } catch (error) {
            throw new Error(error)   
        }
    },

    getProducts: async ()=> {
        try {
            const messages = await db('productos').select()
            return messages
        } catch (error) {
            throw new Error(error)  
        }
    },

    deleteProduct: async (id)=> {
        try {
            await db('productos').del().where('id', id)
            return
        } catch (error) {
            throw new Error(error)  
        }
    },

    updateProduct: async (id, data)=> {
        try {
            await db('productos').update(data).where('id', id)
            return
        } catch (error) {
            throw new Error(error)  
        }
    }
}