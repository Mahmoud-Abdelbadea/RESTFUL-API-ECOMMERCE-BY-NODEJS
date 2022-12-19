const {validationResult}=require('express-validator')
module.exports=(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
 console.log(errors.array())
 const error=errors.array().map(val=>val.msg)
  

        return res.status(400).json({
            status:"fail",
            message:error})
    }
    next()
}
