
const subCategoryModel=require('../models/subCategoriesModel')
const handelFactory=require('../utils/handelFactory')

const asyncHandler = require('express-async-handler')
const sharp=require('sharp')
const { v4: uuidv4 } = require('uuid');
const {uploadSingleImage}=require('../middleWare/uploadSingleImage')
exports.uploadSubCategoryImage=uploadSingleImage('image')


exports.resizeSubCategoryImage=asyncHandler (async(req,res,next)=>{
 
  const filename=`category-${uuidv4()}-${Date.now()}-jpeg`
  if(req.file){
    await sharp(req.file.buffer).resize(600,600).toFormat('jpeg').jpeg({quality:95}).toFile(`uploads/Subcategories/${filename}`)
    req.body.image=filename}
    next();
  })

/*
@desc create subCategory
@route  post /api/v1/subCategory
@access private
*/

exports.createSubCategory = handelFactory.createOne(subCategoryModel)

/*
    @desc get subCategory
    @route  get /api/v1/subCategory
    @access public
*/

exports.getSubCategories = handelFactory.getAll(subCategoryModel)
 
/*
    @desc get subCategory by id
    @route  get /api/v1/subCategory/:id
    @access public
*/

exports.getSubCategory =handelFactory.getOne(subCategoryModel)

/*
    @desc updatesubCategoryby id
    @route  put /api/v1/subCategory/:id
    @access private
*/

exports.updateSubCategory = handelFactory.updateOne(subCategoryModel)

/*
    @desc delete subCategoryby id
    @route  delete /api/v1/subCategory/:id
    @access private
*/

exports.deleteSubCategory = handelFactory.deleteOne(subCategoryModel)