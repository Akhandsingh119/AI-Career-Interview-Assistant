require("dotenv").config()
const App=require('./Src/app')
const ConnectDB=require('./Src/config/database')

ConnectDB()

App.get("/",async(req,res)=>{
    res.send("API is working")
})


App.listen(3000,()=>{
    console.log("server is running")
})

 
 