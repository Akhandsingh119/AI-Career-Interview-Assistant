import React from 'react'
import { useAuth } from '../Hooks/Use.Authcontext'
import { useNavigate } from 'react-router'
import Loading from './Loading'
import { Navigate } from "react-router-dom";

function Protected({children}) {
    const {loading,user}=useAuth()
    const navigate=useNavigate()

    if(loading){
        return(
            <Loading/>
        )
    }

  if (!user) {
    return <Navigate to="/login"  />;
  }



  return children
}

export default Protected