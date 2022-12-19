const router = require('express').Router()
const {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    uploadProductImage,
    resizeProductImage
    
} = require('../controllers/productsControllers')
const {createProductValidator,updateProductValidator}=require('../utils/validator/productValidator')
const {protect,allowedTo}=require('../controllers/authControllers')
const Reviews=require('./reviewRoute')
router.use('/products/:productId',Reviews)
router
.route('/product')
.post(protect,allowedTo('admin','manger'),uploadProductImage,
resizeProductImage,createProductValidator,createProduct)
.get(getProducts)
router
.route('/product/:id')
.get(getProduct)
.put(protect,allowedTo('admin','manger'),uploadProductImage,
resizeProductImage,updateProductValidator,updateProduct)
.delete(protect,allowedTo('admin','manger'),deleteProduct)
module.exports = router