import { useContext } from "react";
import {AuthContext} from '../context/auth.context.jsx'


import {login,register,logout,getme} from '../Service/auth.api.js'


export const useAuth=()=>{
    const context=useContext(AuthContext)
    const{user, setUser, loading, setLoading}=context
    
     
    const handleLogin=async({email,password})=>{
        setLoading(true)
        const data=await login({email,password})
        console.log(data.user)
    
         setUser(data.user)
        setLoading(false)
    }

    
    const handleRegister=async({username,email,password})=>{
        setLoading(true)
        const data=await register({username,email,password})
        setUser(data.user)
         setLoading(false)
    } 
    
    const handlelogout=async()=>{
        setLoading(true)
        const data=await logout()
        setUser(null)
        setLoading(false)
    }

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handlelogout
  };

} 