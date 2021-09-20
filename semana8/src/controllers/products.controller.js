const productsService = require("../services/products.service.js")

module.exports = {
    saveProduct: async (req, res) => {
        const { body } = req;
        try {
            productsService.saveProduct(body)
            res.status(200).send('Producto recibido')
        } catch (error) {
            res.status(400).send(error.message)
        }
    },
    getProducts: async (req, res)=> {
        try {
            const products = await productsService.getProducts()
            res.status(200).json({ products });
        } catch (error) {
            res.status(400).send(error.message)
        }
    },
    deleteProduct: async (req, res)=>{
        const { id } = req.params
        try {
            await productsService.deleteProduct(id)
            res.status(200).send("Producto eliminado")
        } catch (error) {
            res.status(400).send(error.message)
        }
    },
    updateProduct: async (req, res)=>{
        const { id } = req.params
        const { body } = req
        try {
            await productsService.updateProduct(id, body)
            res.status(200).send("Producto actualizado")
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}