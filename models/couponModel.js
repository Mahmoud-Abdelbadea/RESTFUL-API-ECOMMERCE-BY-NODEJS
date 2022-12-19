const mongoose = require('mongoose')

const couponsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique:true
     },
    expire: Date,
    discount:Number





}, { timestamps: true });



module.exports = mongoose.model('coupons', couponsSchema)