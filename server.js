const path =require('path')
const express = require("express")
const cors = require('cors')
const bodyParser=require('body-parser')
const dotenv = require('dotenv')

dotenv.config({ path: 'config.env' })
const morgan = require('morgan')
const AppError=require('./utils/AppError')
const globalError=require('./controllers/errorControllers')

const dbconection = require("./config/database")

const {allRoutes}=require('./routes/router')


dbconection()
const app = express()
app.use(cors())

app.use(express.json());

app.use(express.static(path.join(__dirname,'uploads')))
if (process.env.NODE_ENV === "Development") {
    app.use(morgan('dev'))
    console.log("development")


}

allRoutes(app)


app.all('*',(req,res,next)=>{
  next(new AppError(`can't find this route ${req.originalUrl}`,400))
})
//@ global error handling in express
app.use(globalError)


const PORT = process.env.PORT || 3000
const server=app.listen(8500, () => {
    console.log(`App running ${PORT}`)
})
// Handling rejection out express
process.on("unhandledRejection",(err)=>{
    console.error(`unhandledRejection :${err}`)
    server.close(()=>{
        console.error("shutting down....")
        process.exit(1)
    })
    
})