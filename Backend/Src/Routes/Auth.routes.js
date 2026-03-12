const express=require('express')
const {
    logoutUserController,
    RegisterController,
    loginUserController,
    getMeController

}=require('../Controller/Auth.contoller')
const Authusermiddleware = require('../Middleware/Auth.middleware')

const AuthRouter=express.Router()


AuthRouter.post("/register",RegisterController)
AuthRouter.post("/login",  loginUserController)
AuthRouter.get("/logout",logoutUserController)
AuthRouter.get("/get-me",Authusermiddleware,getMeController)

module.exports=AuthRouter