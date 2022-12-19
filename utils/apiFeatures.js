

class ApiFeatures{
    constructor(mongooseQuery,queryString){
        this.mongooseQuery=mongooseQuery
        this.queryString=queryString
 }

 filter(){
    const queryStringObj={...this.queryString}

    const excludsFields=['page','fields','limit','sort']
    excludsFields.forEach((fields)=>{
      delete queryStringObj[fields]
    })
//flitering by gt gte lt lte
    let queryStr = JSON.stringify(queryStringObj)
    console.log(queryStr)
    queryStr = queryStr.replace((/gt|gte|lte|lt/g),match=>`$${match}`)
    console.log(queryStringObj)
    console.log( JSON.parse(queryStr))
    this.mongooseQuery=this.mongooseQuery.find(JSON.parse(queryStr))




return this


 }


sort(){

    if(this.queryString.sort){
        const sortBy=this.queryString.sort.split(',').join(' ')
       this.mongooseQuery = this.mongooseQuery.sort(sortBy)
       
    }
    else{
        this.mongooseQuery=this.mongooseQuery.sort('-createAt')



    }
    return this

}

fields(){


    if(this.queryString.fields){
        const selectFields=this.queryString.fields.split(',').join(' ')
        this.mongooseQuery = this.mongooseQuery.select(selectFields)
    }
    return this


}

search(modelName){

    if(this.queryString.keyword){
        const  query={}
        if(modelName==='products'){
        query.$or=[{title:{$regex:this.queryString.keyword,$options:'i'}},{description:{$regex:this.queryString.keyword,$options:'i'}}]

        this.mongooseQuery = this.mongooseQuery.find(query)  }
        else{
            query={name:{$regex:this.queryString.keyword,$options:'i'}}
            this.mongooseQuery = this.mongooseQuery.find(query)
        }
 
    
   
}
return this

}


paginate(documentCounts){

    const page = this.queryString.page * 1 || 1
    const limit =this.queryString.limit * 1
    const skip = (page - 1) * limit
    const endIndex=page*limit
    const paginationResult={};
    paginationResult.limit=limit;
    paginationResult.currentPage=page;
    paginationResult.countOfPage=Math.ceil(documentCounts/limit)
   
    if(skip>0){
        paginationResult.prev=page-1
        }
    if(documentCounts>endIndex){
        paginationResult.next=page+1
    }

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit)
    this.paginationResult=paginationResult;

    return this

}









};

module.exports=ApiFeatures