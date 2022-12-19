 const router = require('express').Router({mergeParams :true})
 const {protect,allowedTo}=require('../controllers/authControllers')
const {
    createSubCategory,
    getSubCategory,
    getSubCategories,
    updateSubCategory,
    deleteSubCategory,
uploadSubCategoryImage,
resizeSubCategoryImage}= require('../controllers/subCategoriesControllers')

    
router
.route('/subCategory')
.post(protect,allowedTo('admin','manager'),uploadSubCategoryImage,
resizeSubCategoryImage,createSubCategory)
.get(getSubCategories)
router
.route('/subCategory/:id')
.get(getSubCategory)
.put(protect,allowedTo('admin','manager'),uploadSubCategoryImage,
resizeSubCategoryImage,updateSubCategory)
.delete(protect,allowedTo('admin','manager'),deleteSubCategory)

module.exports = router