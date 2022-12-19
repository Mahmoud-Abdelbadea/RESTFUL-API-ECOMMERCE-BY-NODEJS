const router = require('express').Router()
const {
    createCoupon,
    getCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon,
}=require('../controllers/couponController')
const {protect,allowedTo}=require('../controllers/authControllers')
const {createCouponValidator ,updateCouponValidator}=require('../utils/validator/couponValidator')



router
.route('/Coupon')
.post(protect,allowedTo('admin','manager'),createCouponValidator,createCoupon)
.get(protect,allowedTo('admin','manager'),getCoupons)
router
.route('/Coupon/:id')
.get(protect,allowedTo('admin','manager'),getCoupon)
.put(protect,allowedTo('admin','manager'),updateCouponValidator,updateCoupon)
.delete(protect,allowedTo('admin','manager'),deleteCoupon)
module.exports = router