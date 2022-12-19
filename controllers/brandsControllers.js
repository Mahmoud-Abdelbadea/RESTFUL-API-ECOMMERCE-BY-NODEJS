const BrandsModel = require('../models/brandsModels')

const handelFactory=require('../utils/handelFactory')

const sharp=require('sharp')

const { v4: uuidv4 } = require('uuid');

const asyncHandler = require('express-async-handler')
const {uploadSingleImage}=require('../middleWare/uploadSingleImage')

exports.uploadBrandImage=uploadSingleImage('image')

exports.resizeBrandImage=asyncHandler (async(req,res,next)=>{
    if(req.file){
 
  const filename=`brand-${uuidv4()}-${Date.now()}-jpeg`
    await sharp(req.file.buffer).resize(600,600).toFormat('jpeg').jpeg({quality:95}).toFile(`uploads/Brands/${filename}`)
    req.body.image=filename}
    next();
  })

/*
    @desc create brand
    @route  post /api/v1/brand
    @access private
*/
exports.createBrand = handelFactory.createOne(BrandsModel)
/*
    @desc get brand
    @route  get /api/v1/brand
    @access public
*/
exports.getBrands= handelFactory.getAll(BrandsModel)
/*
    @desc get brand by id
    @route  get /api/v1/brand/:id
    @access public
 */
exports.getBrand= handelFactory.getOne(BrandsModel)
/*
    @desc update brand by id
    @route  put /api/v1/brand/:id
    @access private
*/
exports.updateBrand=  handelFactory.updateOne(BrandsModel)
/*
    @desc delete brandby id
    @route  delete /api/v1/brand/:id
    @access private
*/
exports.deleteBrand= handelFactory.deleteOne(BrandsModel)