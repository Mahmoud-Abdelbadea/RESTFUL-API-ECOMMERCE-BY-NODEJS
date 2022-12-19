const sharp=require('sharp')

const { v4: uuidv4 } = require('uuid');

const productModel = require('../models/productsModels')

const asyncHandler = require('express-async-handler')
const handelFactory=require('../utils/handelFactory')

const {uploadMixImage}=require('../middleWare/uploadSingleImage')

exports.uploadProductImage=uploadMixImage([{
    name:'imageCover',
    maxCount:1
},{
    name:'images',
    maxCount:5
}])

exports.resizeProductImage=asyncHandler (async(req,res,next)=>{
 
  let filename=`products-${uuidv4()}-${Date.now()}-imageCover-jpeg`

  if(req.files.imageCover){
    console.log(req.files.imageCover[0].buffer)
    await sharp(req.files.imageCover[0].buffer).resize(600,600).toFormat('jpeg').jpeg({quality:95}).toFile(`uploads/products/${filename}`)
    req.body.imageCover=filename

}
if(req.files.images){
    req.body.images=[]
    await Promise.all(  req.files.images.map(async(img,index)=>{
        filename=`products-${uuidv4()}-${Date.now()}-image[${index+1}]-jpeg`
        await sharp(img.buffer).resize(600,600).toFormat('jpeg').jpeg({quality:95}).toFile(`uploads/products/${filename}`)
        req.body.images.push(filename)

    }))
   console.log(req.body.imageCover)
   console.log(req.body.images)
   


}
next()
  



  })


/*
    @desc create product
    @route  post /api/v1/product
    @access private
*/
exports.createProduct = handelFactory.createOne(productModel)
/*
    @desc get product
    @route  get /api/v1/product
    @access public
*/
exports.getProducts = handelFactory.getAll(productModel,'products')
/*
    @desc get product by id
    @route  get /api/v1/product/:id
    @access public
*/
exports.getProduct =handelFactory.getOne(productModel,'reviews')
/*
    @desc update product by id
    @route  put /api/v1/product/:id
    @access private
*/
exports.updateProduct = handelFactory.updateOne(productModel)
/*
    @desc delete product by id
    @route  delete /api/v1/product/:id
    @access private
*/
exports.deleteProduct = handelFactory.deleteOne(productModel)