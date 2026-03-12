const jwt=require('jsonwebtoken')
const Blacklist=require("../Model/blacklist.model")
const userModel=require('../Model/user.model')
async function Authusermiddleware(req,res,next)
{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"token not provided"
        })


    }

    const Blacklistuser=await Blacklist.findOne({
        token
    })

    if(Blacklistuser){
        return res.status(401).json({
            message:"Unauthariesd Acesss"
        })
    }


try{ 
    
    
    const decode=jwt.verify(token,process.env.JWT_TOKEN_SECREA)
     const user=await userModel.findOne({
            _id:decode.id
        })




        if(!user){
            return res.status(401).json({
                message:"Token was expired Login it Again"
            })
        }

       

    req.user=user


 
     next()
}catch(err){
    return res.status(401).json({
        message:err.message

    })
}
}

module.exports=Authusermiddleware
