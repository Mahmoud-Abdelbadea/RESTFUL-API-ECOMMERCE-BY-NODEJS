const AppError=require('../utils/AppError')

const multer= require('multer')
 
/*const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, '/uploads/categories')
        },
        filename: function (req, file, cb) {
          
         const filename=`category-${uuidv4()}-${Date.now()}-jpeg`
          cb(null, filename)
        },
        
})*/    

const multerOptional=()=>{

      const mutlerStorage=multer.memoryStorage() 
      
      const multerFilter=function(req, file, cb){
            console.log(file.mimetype)
        
         if(file.mimetype.startsWith('image')){
            cb(null,true)
         }
         else{
            cb(new AppError('this file is not image please enter image',400),false)
         }
          
          
          }
          
          const upload = multer({ storage: mutlerStorage,fileFilter:multerFilter })

          return upload;
}

exports.uploadSingleImage=(imageName)=> multerOptional().single(imageName)


exports.uploadMixImage=(imageName)=> multerOptional().fields(imageName)