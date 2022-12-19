const CouponsModel = require('../models/couponModel')

const handelFactory=require('../utils/handelFactory')

/*
    @desc create Coupon
    @route  post /api/v1/Coupon
    @access private
*/
exports.createCoupon = handelFactory.createOne(CouponsModel)
/*
    @desc get Coupon
    @route  get /api/v1/Coupon
    @access private
*/
exports.getCoupons= handelFactory.getAll(CouponsModel)
/*
    @desc get Coupon by id
    @route  get /api/v1/Coupon/:id
    @access private
 */
exports.getCoupon= handelFactory.getOne(CouponsModel)
/*
    @desc update Coupon by id
    @route  put /api/v1/Coupon/:id
    @access private
*/
exports.updateCoupon=  handelFactory.updateOne(CouponsModel)
/*
    @desc delete Couponby id
    @route  delete /api/v1/Coupon/:id
    @access private
*/
exports.deleteCoupon= handelFactory.deleteOne(CouponsModel)