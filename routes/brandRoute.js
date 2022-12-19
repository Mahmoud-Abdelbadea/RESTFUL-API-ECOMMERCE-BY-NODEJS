const router = require('express').Router()
const {
    createBrand,
    getBrand,
    getBrands,
    updateBrand,
    deleteBrand,
    uploadBrandImage,
    resizeBrandImage
} = require('../controllers/brandsControllers')
const {protect,allowedTo}=require('../controllers/authControllers')
router
.route('/brand')
.post(protect,allowedTo('admin','manager'),uploadBrandImage,resizeBrandImage,createBrand)
.get(getBrands)
router
.route('/brand/:id')
.get(getBrand)
.put(protect,allowedTo('admin','manager'),uploadBrandImage,resizeBrandImage,updateBrand)
.delete(protect,allowedTo('admin','manager'),deleteBrand)
module.exports = router