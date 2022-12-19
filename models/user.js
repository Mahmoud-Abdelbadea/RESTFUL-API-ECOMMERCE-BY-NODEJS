const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator=require('validator')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'name required'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'email required'],
      unique: true,
      lowercase: true,
      validate:[validator.isEmail,'Please provide a valid email']
    },
    phone: String,
    profileImg: String,

    password: {
      type: String,
      required: [true, 'password required'],
      minlength: [8, 'Too short password'],
    
    },
    passwordConfirm: {
      type: String,
      required: [true, 'passwordconfirm required'],
      validate: {
      
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!'
      }
    },

    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    role: {
      type: String,
      enum: ['user', 'manager', 'admin'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true
   
    },
    // child reference (one to many)
    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'product',
      },
    ],
    addresses: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        alias: String,
        details: String,
        phone: String,
        city: String,
        postalCode: String,
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm=undefined
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;