import React from 'react'
import { useNavigate, Link } from "react-router";

import {useAuth} from '../Hooks/Use.Authcontext.js'
import { useState } from 'react';
import Loading from '../Componenets/Loading.jsx';

function Login() {
  const navigate=useNavigate()
  const {loading,handleLogin}=useAuth()

 const [email,setemail]=useState(" ")
 const [password,setpassword]=useState(" ")
    
    const handleSubmit = (e) => {
  e.preventDefault();
  handleLogin({email,password})
   navigate("/")

}

  if (loading) {
  return (
    <Loading/>
  ) 
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        {/* Form */}
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              onChange={(e)=>{setemail(e.target.value)}}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              onChange={(e)=>{setpassword(e.target.value)}}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleSubmit}
            >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account? <Link to={"/register"}>
          
            Sign up
          
          </Link>
        </p>
      </div>
    </div>

  )
}

export default Login