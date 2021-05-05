const express = require('express')
const routes= express.Router()
const userContollers = require('../controllers/user')
const auth = require('../middlewares/auth')

//All auth routes

routes.post('/signup',userContollers().signup)
routes.post('/signin',userContollers().signin)
routes.get('/signout',userContollers().signout)


module.exports=routes