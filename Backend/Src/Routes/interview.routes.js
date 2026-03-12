const express=require('express')

const Interview=express.Router()
const Authusermiddleware=require('../Middleware/Auth.middleware')
const upload =require('../Middleware/file.middleware')

const{Interviews,getAllInterviews,GenerateInterViewReportController}=require('../Controller/Interview.Controller')


Interview.post("/",Authusermiddleware,upload.single("resume"),Interviews)
Interview.get("/:interviewId",Authusermiddleware,GenerateInterViewReportController)
Interview.get("/",Authusermiddleware,getAllInterviews)

module.exports=Interview 