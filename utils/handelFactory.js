
const asyncHandler = require('express-async-handler')
const slugify=require('slugify')
const { model } = require('../models/subCategoriesModel')
const ApiFeatures=require('./apiFeatures')


const AppError=require('./AppError')

exports.deleteOne=(model)=>
asyncHandler(async(req, res, next) => {

        let document = await model.findByIdAndDelete({ _id: req.params.id })
    
        if (!model) {
            return next(new AppError(`Not document for this id :${req.params.id}`),404)
         }
        //Trigger remove event when delete document
            document.remove()
       
    
        res.status(204).json({ 
            status:"success",
            data: document  })
    
    
    })
    exports.updateOne=(model)=> 
    asyncHandler(async(req, res, next) => {
            if(req.body.title ){
                req.body.slug=slugify(req.body.title)
            }
            if(req.body.name){
                req.body.slug=slugify(req.body.name)
            }
            //const document =await model.updateMany({},{category:req.body.category})
              const document= await model.findByIdAndUpdate({ _id: req.params.id },  req.body, { new: true,runValidators:true })
            //Trigger save event when update document
            document.save();
                    if (!document) {
                        return next(new AppError(`Not ${`${model}`.replace(/model | models/i,'')} for this id :${req.params.id}`,404))
                     }
            
                    res.status(200).json({ data: document })
            
            
                })

    exports.createOne=(model)=>
    asyncHandler(async(req, res, next) => {
        if(req.body.title ){
            req.body.slug=slugify(req.body.title)
        }
        if(req.body.name){
            req.body.slug=slugify(req.body.name)
        }
      
        if(req.params.categoryId && !req.body.categoryId){
            req.body.categoryId=req.params.categoryId
           
        }
        if(req.params.productId && !req.body.productId){
            req.body.productId=req.params.productId
           
        }
        
     
        const document= await model.create(req.body)
        res.status(201).json(document)
    
    
    })
    exports.getOne=(model,population)=>
    asyncHandler(async(req, res, next) => {
    let query=model.findById({_id:req.params.id,product:req.params.productId} )
    if(population){
        query=query.populate(population)
    }
    console.log(population)
        

        const document= await query
        if (!document) {
            return next(new AppError(`Not documentfor this id :${req.params.id}`,404))

        }

        res.status(200).json({ data: document})


    })
    exports.getAll=(model,modelName)=>
    asyncHandler(async(req, res, next) => {
        let filterObj={}
        if(req.params.categoryId){
            filterobj={category:req.params.categoryId}
        }
        if(req.params.productId){
            filterobj={product:req.params.productId}
        }
        if(req.filterObj){
            filterObj = { user: req.user._id }

        }
        //Build query
const documentCounts=await model.countDocuments()
const apiFeature=new ApiFeatures(model.find(filterObj),req.query)
.filter()
.fields()
.search(modelName)
.sort()
.paginate(documentCounts)



//excute query
const {mongooseQuery,paginationResult}= apiFeature
  const document= await  mongooseQuery
          if (!document) {
   return next(new AppError(`Not documents for this id :${req.params.id}`,404))

  }
  res.status(200).json({ result: document.length,paginationResult, data: document })



})
        