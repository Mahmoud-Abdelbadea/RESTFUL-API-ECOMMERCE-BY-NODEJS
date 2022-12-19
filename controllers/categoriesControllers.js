const sharp=require('sharp')
const categoryModel = require('../models/categoriesModels')
const handelFactory=require('../utils/handelFactory')
const { v4: uuidv4 } = require('uuid');

const asyncHandler = require('express-async-handler')
const {uploadSingleImage}=require('../middleWare/uploadSingleImage')
exports.uploadCategoryImage=uploadSingleImage('image')


exports.resizeCategoryImage=asyncHandler (async(req,res,next)=>{
 
  const filename=`category-${uuidv4()}-${Date.now()}-jpeg`
  if(req.file){
    await sharp(req.file.buffer).resize(600,600).toFormat('jpeg').jpeg({quality:95}).toFile(`uploads/categories/${filename}`)
    req.body.image=filename}
    next();
  })

/*
@desc create category
@route  post /api/v1/category
@access private
*/
exports.createCategory = handelFactory.createOne(categoryModel)

/*
@desc get category
@route  get /api/v1/category
@access public
*/
exports.getCategories =handelFactory.getAll(categoryModel)
    /*
    @desc get category by id
    @route  get /api/v1/category/:id
    @access public
    */
exports.getCategory = handelFactory.getOne(categoryModel)
    /*
        @desc update category by id
        @route  put /api/v1/category/:id
        @access private
        */
exports.updateCategory = handelFactory.updateOne(categoryModel)
    /*
           @desc delete category by id
           @route  delete /api/v1/category/:id
           @access private
           */
exports.deleteCategory =  handelFactory.deleteOne(categoryModel)