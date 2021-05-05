const jwt = require('jsonwebtoken')
const auth = async (req,res,next) =>{
    let authHeaders= req.headers.authorization
    if(!authHeaders){
        return res.json('Auth head is missing')
    }
    const token=authHeaders.split(' ')[1];
    try{
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                return res.json(err)
            }
            req.user=user
            next()
        })

    }catch(err){

    }

}

module.exports=auth