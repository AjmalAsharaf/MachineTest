const Message = require('../models/messages')

function messageController(){
    return{
        createMessage(req,res){
            
            const{message} =req.body
           
            const newMessage=new Message({
                message,
                user:req.user
            })
            newMessage.save()
            .then((message)=>{
                return res.status(200).json({message:'Message added',message})
            })
            .catch((err)=>{
                return res.status(400).json({error:'Something went wrong',err})
            })
        },
        async updateMessage(req,res){
            const{message,id} =req.body

           let updateMessage =await Message.findOne({_id:id})
           updateMessage.message=message
           
           updateMessage.save((err,data)=>{
               if(err){
                   return res.json(err)
               }else{
                   return res.json(data)
               }
           })
            
            
        },
        getmessages(req,res){
            Message.find({user:req.user}).exec((err, data) => {
                if (err) {
                   return res.status(400).json(err)
                }else{
                    return res.status(200).json(data)
                }
               
            });
        
        },
            deleteMessages(req,res){
            const {id}=req.body
            Message.deleteOne({_id:id}).exec((err,data)=>{
                if(err){
                    return res.status(400).json(err)
                }else{
                    return res.status(200).json({message:'deleted'})
                }
            })
        },
        async getSingleMessage(req,res){
            const messageId = req.params.messageId
            let message =await Message.findOne({_id:messageId})
            console.log(message)
            return res.status(200).json(message)
        }
    }
}
module.exports=messageController