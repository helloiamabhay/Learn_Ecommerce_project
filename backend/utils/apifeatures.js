class ApiFeatures{
    constructor(query,queryStr){
        this.query=query
        this.queryStr=queryStr
    }

    search(){
        const keyword=this.queryStr.keyword ?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            },
        }:{};
      
        this.query=this.query.find({...keyword})
        return this;
    }


    filter(){
       const queryCopy={...this.queryStr}
     
       
       // removingsome field for category
       const removeFields=["keyword","pase","limit"]
       removeFields.forEach(key=>delete queryCopy[key] )

       // filter for price and rating
     
    let queryStr=JSON.stringify(queryCopy)
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`)
       
       // this.query means product.find
       this.query=this.query.find(JSON.parse(queryStr))
       
       return this;
    }

    pagination(resultPerPase){
        const currentPase=Number(this.queryStr.pase) || 1  
        const skip=resultPerPase * (currentPase-1);
        this.query=this.query.limit(resultPerPase).skip(skip)
        return this;
    }
}

module.exports=ApiFeatures