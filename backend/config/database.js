const mongoose=require("mongoose")

// mongoose.connect("mongo://localhost:27017/Ecommerce",{useNewUrlParser:true,useUnifiedTopology:true,
const connectDatabase=()=>{
mongoose.connect(process.env.DB_URI).then((data)=>{
console.log(`mongodb connected with server: ${data.connection.host}`)
})

}


module.exports=connectDatabase