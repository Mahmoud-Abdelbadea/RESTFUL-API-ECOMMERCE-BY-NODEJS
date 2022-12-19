const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const asyncHandler = require('express-async-handler');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/email');
const createToken = require('../utils/createToken');

const User = require('../models/user');

// @desc    Signup
// @route   Post /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
  // 1- Create user
 const  {name,email,password,passwordConfirm}=req.body
  const user = await User.create({
    name,
    email,
    password,
    passwordConfirm

  });

  // 2- Generate token
  const token = createToken(user._id);

  res.status(201).json({ data: user, token });
});

// @desc    Login
// @route   GET /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {

const {email,password}=req.body
  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email})

  //  check if user exist & check if password is correct
  if (!user || !(await  bcrypt.compare(password,user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  user.active=true
  await user.save({validateBeforeSave:false})
  // generate token
  const token = createToken(user._id);

  delete user._doc.password
  
  res.status(200).json({ data: user, token });
});

// @desc   make sure the user is logged in
exports.protect = asyncHandler(async (req, res, next) => {
  // 1) Check if token exist, if exist get
  let token;
  console.log(req.headers)
  if (
    req.headers.authorization 

  ) {
    token = req.headers.authorization
  }
  console.log(token)
  if (!token) {
    return next(
      new AppError(
        'You are not login, Please login to get access this route',
        401
      )
    );
  }

  // 2) Verify token (no change happens, expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded)

  // 3) Check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new AppError(
        'The user that belong to this token does no longer exist',
        401
      )
    );
  }

  // 4) Check if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    // Password changed after token created (Error)
    if (passChangedTimestamp > decoded.iat) {
      return next(
        new AppError(
          'User recently changed his password. please login again..',
          401
        )
      );
    }
  }

  if(!currentUser.active){
    return next(
      new AppError(
        'User recently not active. please login again..',
        401
      )
    );
  }

  req.user = currentUser;
  next();
});

// @desc    Authorization (User Permissions)
// ["admin", "manager"]
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    // 1) access roles
    // 2) access registered user (req.user.role)

    console.log(req.user.role)
    console.log(roles)
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You are not allowed to access this route', 403)
      );
    }
    next();
  });

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotPassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with that email ${req.body.email}`, 404)
    );
  }
  // 2) If user exist, Generate hash reset random 6 digits and save it in db
  const resetCode = crypto.randomBytes(3).toString('hex');
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(resetCode)
    .digest('hex');

  // Save hashed password reset code into db
  user.passwordResetCode = hashedResetCode;
  // Add expiration time for password reset code (10 min)
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  user.passwordResetVerified = false;

  await user.save({ validateBeforeSave: false })

  // 3) Send the reset code via email
  const message =`Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset code (valid for 10 min)',
      message,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await   await user.save({ validateBeforeSave: false })
    return next(new AppError('There is an error in sending email', 500));
  }

  res
    .status(200)
    .json({ status: 'Success', message: 'Reset code sent to email' });
});

  
// @desc    Verify password reset code
// @route   POST /api/v1/auth/verifyResetCode
// @access  Public
exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
  // 1) Get user based on reset code
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(req.body.resetCode)
    .digest('hex');

  const user = await User.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError('Reset code invalid or expired'));
  }

  // 2) Reset code valid
  user.passwordResetVerified = true;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'Success',
    message:"you can reset password now"
  });
});

// @desc    Reset password
// @route   POST /api/v1/auth/resetPassword
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on email
  const {email,newPassword}=req.body
  if(!email || !newPassword){
    return next(
      new AppError(`those data required`, 400)
    );
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(
      new AppError(`There is no user with email ${email}`, 404)
    );
  }

  // 2) Check if reset code verified
  if (!user.passwordResetVerified) {
    return next(new ApiError('Reset code not verified', 400));
  }

  user.password = newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save({ validateBeforeSave: false });

  // 3) if everything is ok, generate token
  const token = createToken(user._id);
  res.status(200).json({ token });
});