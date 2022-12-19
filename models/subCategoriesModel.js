const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, 'minlength is 3 characters'],
        maxlength: [32, 'maxlength is 32 characters']
    },
    slug: {
        type: String,
        lowercase: true,

    },
    categoryId:{
        type:mongoose.Schema.ObjectId,
        ref:'category',
        required:[true,'please enter category ID']
      
    },
    image:{
        type:String,
        required:[true]

    }
 







}, { timestamps: true });
module.exports = mongoose.model('subCategory',subCategorySchema)
