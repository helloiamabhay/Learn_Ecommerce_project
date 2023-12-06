const app=require("./app")

const dotenv=require("dotenv")
const connectDatabase=require("./config/database")

// error handling uncaught error
process.on("uncaughtException",(err)=>{ 
    console.log(`server: ${err.message}`)
    console.log(" shutting down the server due to the promise rejection")
})
//console.log(youtube)
// config
dotenv.config({path:"backend/config/config.env"})

// connecting data base
connectDatabase()

const server=app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})


// unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server due to unhandled rejecton`)
    server.close(()=>{
        process.exit(1)
    })

})