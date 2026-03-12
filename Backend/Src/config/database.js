const mongoose=require('mongoose')

async function ConnectDb(){
   await mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
        console.log("Database connected sucessfullly")
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports=ConnectDb