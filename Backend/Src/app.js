const express=require('express')
const cookieParser = require('cookie-parser');
const AuthRouter=require('./Routes/Auth.routes')
const Interview=require('./Routes/interview.routes')
const cors=require('cors')
const App=express()
App.use(
  cors({
    origin: "http://localhost:5173",
     credentials: true
  })
);
App.use(express.json())
App.use(cookieParser());

App.use("/api/Auth",AuthRouter)
App.use("/api/Interview",Interview)

module.exports=App