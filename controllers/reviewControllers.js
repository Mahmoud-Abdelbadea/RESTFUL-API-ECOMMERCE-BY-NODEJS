const ReviewsModel = require('../models/reviewModel')

const handelFactory=require('../utils/handelFactory')


const asyncHandler = require('express-async-handler')


/*
    @desc create Review
    @route  post /api/v1/Review
    @access private user
*/
exports.createReview = handelFactory.createOne(ReviewsModel)
/*
    @desc get Review
    @route  get /api/v1/Review
    @access public
*/
exports.getReviews= handelFactory.getAll(ReviewsModel)
/*
    @desc get Review by id
    @route  get /api/v1/Review/:id
    @access user
 */
exports.getReview= handelFactory.getOne(ReviewsModel)
/*
    @desc update Review by id
    @route  put /api/v1/Review/:id
    @access private User
*/
exports.updateReview=  handelFactory.updateOne(ReviewsModel)
/*
    @desc delete Reviewby id
    @route  delete /api/v1/Review/:id
    @access user ,admin,manager
*/
exports.deleteReview= handelFactory.deleteOne(ReviewsModel)