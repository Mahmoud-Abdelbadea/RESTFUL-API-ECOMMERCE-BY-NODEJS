const router = require('express').Router()
const {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    uploadCategoryImage,resizeCategoryImage
} = require('../controllers/categoriesControllers')
const {protect,allowedTo}=require('../controllers/authControllers')
const subCategories=require('./subCategoryRoute')
router.use('/category/:categoryId',subCategories)

router
.route('/category')
.post(protect,allowedTo('admin','manager'),uploadCategoryImage,resizeCategoryImage,createCategory)
.get(getCategories)

router
.route('/category/:id')
.get(getCategory)
.put(protect,allowedTo('admin','manager'),uploadCategoryImage,resizeCategoryImage,updateCategory)
.delete(protect,allowedTo('admin','manager'),deleteCategory)
module.exports = router