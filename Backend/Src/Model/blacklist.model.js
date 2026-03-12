const mongoose=require('mongoose')

const blacklist_user=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to be added in blacklist"]
    }
},{
    timestamps:true
}) 


const tokenBlacklistModel=mongoose.model("blacklisttokenSchema",blacklist_user)

module.exports=tokenBlacklistModel