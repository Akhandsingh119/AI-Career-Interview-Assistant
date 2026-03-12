const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username alerady taken"],
        required:true
    }
    ,
    
    email:{
        type:String,
        required:true,
        unique:[true,"Email already taken"]
    }
    ,
    password:{
        type:String,
        required:true

    },


})

const userModel=mongoose.model("User",UserSchema)

module.exports=userModel