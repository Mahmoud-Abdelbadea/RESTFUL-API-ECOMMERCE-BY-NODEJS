const User = require('../models/user')
const bycrpt=require('bcryptjs')

const handelFactory=require('../utils/handelFactory')

const sharp=require('sharp')

const { v4: uuidv4 } = require('uuid');

const {uploadSingleImage}=require('../middleWare/uploadSingleImage')
const asyncHandler = require('express-async-handler')
const slugify=require('slugify');

const AppError=require('../utils/AppError')


exports.uploadUserImage=uploadSingleImage('photo')

exports.resizeUserImage=asyncHandler (async(req,res,next)=>{
 if(req.file){
  const filename=`User-${uuidv4()}-${Date.now()}-jpeg`

    await sharp(req.file.buffer).resize(600,600).toFormat('jpeg').jpeg({quality:95}).toFile(`uploads/Users/${filename}`)
    req.body.image=filename}
    next();
  })

/*
    @desc create User
    @route  post /api/v1/User
    @access private
*/
///admin
exports.createUser = handelFactory.createOne(User)
/*
    @desc get User
    @route  get /api/v1/User
    @access private
*/
exports.getUsers= handelFactory.getAll(User)
/*
    @desc get User by id
    @route  get /api/v1/User/:id
    @access private
 */
exports.getUser= handelFactory.getOne(User)
/*
    @desc update User by id
    @route  put /api/v1/User/:id
    @access private
*/
exports.updateUser=  asyncHandler (async(req,res,next)=>{
    const newUser= await User.findOneAndUpdate(req.params.id,{
        name:req.body.name,
        email:req.body.email,
        photo:req.body.photo
    },{new:true,
        runValidators: true})
    res.status(200).json({data:newUser})

})
exports.updatePasswordOfUser=asyncHandler (async(req,res,next)=>{
    const user=await User.findOne({_id:req.params.id})
    if(!user || !await bycrpt.compare(req.body.currentPassword,user.password)){


        return next(new AppError('current password incorrect',400))

    }
    if(!req.body.newPassword || req.body.newPassword.length<8 || !req.body.currentPassword){
        return next(new AppError('new password required and at least 8 character',400))
    }
    user.password=req.body.newPassword
    user.passwordChangedAt=Date.now()
    await user.save({ validateBeforeSave: false })
    res.status(200).json({data:user})

})
/*
    @desc delete Userby id
    @route  delete /api/v1/User/:id
    @access private
*/
exports.deleteUser= handelFactory.deleteOne(User)
////////////////////////////////////////////////
  // user
  exports.getLoggedUser= asyncHandler(async(req,res,next)=>{
  const user=await User.findOne({_id:req.user._id})
    res.status(200).json(user)

})
exports.updateLoggedUser=asyncHandler(async(req,res,next)=>{
    const filterobj={name:req.body.name,email:req.body.email,phone:req.body.phone,profileImg:req.body.profileImg}

    const user=await User.findOneAndUpdate({_id:req.user._id},filterobj,{new:true,runValidators:true})
    res.status(200).json(user)

})
exports.updatePasswordLoggedUser=asyncHandler(async(req,res,next)=>{

    const user=await User.findOne({_id:req.user._id})
   
    if(!user || !await bycrpt.compare(req.body.currentPassword,user.password)){


        return next(new AppError('current password incorrect',400))

    }
    if(!req.body.newPassword || req.body.newPassword.length<8 || !req.body.currentPassword){
        return next(new AppError('new password required and at least 8 character',400))
    }
    user.password=req.body.newPassword
    user.passwordChangedAt=Date.now()
    await user.save({ validateBeforeSave: false })
    res.status(200).json({data:user})

})
exports.deleteLogged= asyncHandler(async(req,res,next)=>{
const user=await User.findOneAndDelete({_id:req.user._id})
    res.status(200).json(user)

})
