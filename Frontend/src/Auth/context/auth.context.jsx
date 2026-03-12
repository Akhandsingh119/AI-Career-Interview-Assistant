
import React, { createContext, useState,useEffect } from "react";
import { getme } from "../Service/auth.api";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{

   const getAndUser=async()=>{
    try{  const data=await getme()
    setUser(data.user)}catch(err){}finally{
  setLoading(false)
    }

  
  
   }

   getAndUser()

  },[])

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
