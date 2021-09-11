const express = require("express")
const productController = require("../controllers/products.controller.js")

const router = new express.Router()

router.get('/', productController.getProducts)
router.post('/', productController.saveProduct)
router.delete('/:id', productController.deleteProduct)
router.patch('/:id', productController.updateProduct)

module.exports = router