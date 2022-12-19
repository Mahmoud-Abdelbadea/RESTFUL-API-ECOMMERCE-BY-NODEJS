const mongoose = require('mongoose')

const BrandsSchema = new mongoose.Schema({
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
    image:String,





}, { timestamps: true });

const setImageUrl=(doc)=>{
    if(doc.image){
        const urlImage=`${process.env.Base_URL}/Brands/${doc.image}`
        doc.image=urlImage}

}

BrandsSchema.post('init',(doc)=>{
    setImageUrl(doc)
})

BrandsSchema.post('save',(doc)=>{
    setImageUrl(doc)
})

module.exports = mongoose.model('brands', BrandsSchema)