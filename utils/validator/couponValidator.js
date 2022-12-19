const {check,body}=require('express-validator')
const validatorMiddleware=require('../../middleWare/validationMidddleWare')



const coupon= require('../../models/couponModel');


exports.createCouponValidator = [
    check('name')
    .notEmpty()
    .withMessage('name required')
    .custom((val,{req}) =>
      coupon.findOne({name:val}).then((Coupon) => {
        if (Coupon) {
          return Promise.reject(
            new Error(`coupon is unique`)
          );
        }
      })
    ),
    validatorMiddleware]
    exports.updateCouponValidator=[
        check('name')
        .optional()
        .custom((val,{req}) =>
          coupon.findOne({name:val}).then((Coupon) => {
            if (Coupon) {
              return Promise.reject(
                new Error(`coupon is unique`)
              );
            }
          })),
          validatorMiddleware

    ]
