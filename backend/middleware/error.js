const ErrorHandler=require("../utils/errorHandler")
module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500
    err.message=err.message || "internal server error"

// wrong mongodb id error
if (err.name=="CastError") {
    const message=`resource not found . invalid: ${err.path}`
    err=new ErrorHandler(message,400)
}

// mongoose dublicate key error

if (err.code===11000) {
    const message=`duplicate ${Object.keys(err.keyValue)} entered`
    err=new ErrorHandler(message,400)
}

// wrong jwt error

if (err.code==="JsonWebTokenError") {
    const message=`Json web token is invalid, Try again.`
    err=new ErrorHandler(message,400)
}

// jwt expire  error

if (err.code==="TokenExpiredError") {
    const message=`Json web token is expired, Try again.`
    err=new ErrorHandler(message,400)
}

    res.status(err.statusCode).json({
        success:false,
        message:err.message
        // error:err
        // error:err.stack
    })

}