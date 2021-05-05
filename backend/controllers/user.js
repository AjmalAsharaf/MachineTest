const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
function userContollers (){
    return {
       async signup(req,res){
            const {name,email,password} = req.body
            const exist =await User.exists({email:email})
            
            if(exist){
               return res.status(409).json({error:'User already exist'})
            }
            const hashed_password = await bcrypt.hash(password,10)
            const user = new User({
                name,
                email,
                password:hashed_password
            })
            user.save()

            .then((user)=>{
                user.password = undefined
                return res.status(200).json({message:'Signup success'})
            })
            .catch((err)=>{
                return res.status(400).json({error:"Signup failed"})
            })
            
        },
        async signin(req,res){
            const {email,password} = req.body
            const user = await User.findOne({email:email})
            if(!user){
                return res.status(401).json({error:'Invalid credentials'})
            }
            const match = await bcrypt.compare(password,user.password)
            if(!match){
                return res.status(401).json({error:'Invalid credentials'})
            }
            const accessToken= jwt.sign({_id:user._id},process.env.JWT_SECRET)
            res.cookie('t', accessToken, { expire: new Date() + 9999 });
            return res.status(200).json({token:accessToken,user})
        },
        signout(req,res){
            res.clearCookie('t');
            res.json({message: 'Signout success'});

        },
    }

}

module.exports=userContollers