const express = require('express')
const routes= express.Router()
const messageController=require('../controllers/message')
const auth = require('../middlewares/auth')

//all message routes

routes.post('/createMessage',auth,messageController().createMessage)
routes.post('/updateMessage',auth,messageController().updateMessage)
routes.get('/getMessage',auth,messageController().getmessages)
routes.delete('/deleteMessage',auth,messageController().deleteMessages)
routes.get('/getSingleMessage/:messageId',auth,messageController().getSingleMessage)

module.exports=routes