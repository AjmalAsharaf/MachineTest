const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;


const Schema = mongoose.Schema

const messageShema = new Schema({
    message:{type:String,required:true},
    user:{  type: ObjectId,ref: "User",required: true}
    
},{timestamps:true})

module.exports=mongoose.model('Message',messageShema,'messages')