const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Too short product title'],
      maxlength: [100, 'Too long product title'],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [20, 'Too short product description'],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
    },
    sold: {
      type: Number,  
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      trim: true,
      max: [200000, 'Too long product price'],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],

    imageCover: {
      type: String,
      required: [true, 'Product Image cover is required'],
    },
    images: [String],
    Category: {
      type: mongoose.Schema.ObjectId,
      ref: 'category',
    //  required: [true, 'Product must be belong to category'],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'subCategory',
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'brands',
    },
    ratingsAverage: {
      type: Number,
      min: [1, 'Rating must be above or equal 1.0'],
      max: [5, 'Rating must be below or equal 5.0'],
      // set: (val) => Math.round(val * 10) / 10, // 3.3333 * 10 => 33.333 => 33 => 3.3
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
  
   
  }
);

productSchema.virtual('reviews',{
  ref:'Review',
  foreignField:'product',
  localField:'_id'
})
productSchema.pre(/^find/,function(next){
  this.populate({
    path:'Category',
    select:'name _id' 
  });
  next();})

 /* productSchema.pre(/^find/,function(next){
    this.populate('reviews');
  next();
})*/
const setImageUrl=(doc)=>{
  if(doc.imageCover){
      const urlImage=`${process.env.BASE_URL}+/products/${doc.image}`
      doc.mage=urlImage}
    if(doc.images){
    doc.images.forEach((img,index)=>{
      doc.images[index]=`${process.env.Base_URL}+/products/${img}`
    })
    }

}

productSchema.post('init',(doc)=>{
  setImageUrl(doc)
})

productSchema.post('save',(doc)=>{
  setImageUrl(doc)
})

module.exports=mongoose.model('product', productSchema)