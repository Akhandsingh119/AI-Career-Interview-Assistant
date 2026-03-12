import axios from 'axios'


const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function register({username,email,password}){

    try{
   const response=await api.post('/api/Auth/register',{username,password,email})


  return response.data

}catch(err){
console.log(err.message)
}
}

export async function login({email,password}){
    try{

        const response=await api.post('/api/Auth/login',{email,password})
         return response.data
    }catch(err){
        console.log(err.message)
    }
}


export async function logout()
{
    try{

        const response=await api.get('/api/Auth/logout')

        return response.data

    }catch(err){err.message}
}


export async function getme(){
    try{
        const response=await api.get('/api/Auth/get-me')

    return response.data
    }catch(e){
        console.log(e.message)
    }
}


 