const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/user')
const messageRouter = require('./routes/message')
const dotenve=require('dotenv').config()
const cookieParser = require('cookie-parser')


//db connection

const url= process.env.MONGODB_URI
mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true})
const connection= mongoose.connection;
connection.once('open',()=>{
    console.log('Database connected..')
}).catch(err=>{
    console.log('Db connection failed...')
})



//middlewares 
app.use(cors())
app.use(express.json())
app.use(cookieParser())

//routes
app.use('/api',userRouter)
app.use('/api',messageRouter)



app.listen(PORT,()=>{
    console.log(`App is litsening on port ${PORT}`)
})


