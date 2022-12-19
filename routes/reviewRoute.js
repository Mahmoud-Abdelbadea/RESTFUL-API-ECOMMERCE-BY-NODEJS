const router = require('express').Router({mergeParams:true})
const {
    createReview,
    getReview,
    getReviews,
    updateReview,
    deleteReview
 
} = require('../controllers/reviewControllers')
const {
    createReviewValidator,
    getReviewValidator ,
    updateReviewValidator,
    deleteReviewValidator
      }=require('../utils/validator/reviewValidator')
const {protect,allowedTo}=require('../controllers/authControllers')

router
.route('/Review')
.post(protect,allowedTo('user'),createReviewValidator,createReview)
.get(getReviews)
router
.route('/Review/:id')
.get(getReviewValidator,getReview)
.put(protect,allowedTo('user'),updateReviewValidator,updateReview)
.delete(protect,allowedTo('user','manger','admin'),deleteReviewValidator,deleteReview)
module.exports = router