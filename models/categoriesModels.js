const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
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
    image:{
        type:String,
        required:[true,'please enter an image']
      
    }


}, { timestamps: true });

const setImageUrl=(doc)=>{
    if(doc.image){
        const urlImage=`${process.env.Base_URL}/categories/${doc.image}`
        doc.image=urlImage}

}

categorySchema.post('init',(doc)=>{
    setImageUrl(doc)
})

categorySchema.post('save',(doc)=>{
    setImageUrl(doc)
})

module.exports = mongoose.model('category', categorySchema)
