import React, { useState } from "react";

import { useNavigate, Link } from "react-router";
import {useAuth} from '../Hooks/Use.Authcontext.js'
import Loading from '../Componenets/Loading.jsx';


function Register() {
     
    const[username,setusername]=useState(" ")
    const[password,setpassword]=useState(" ")
    const[email,setemail]=useState(" ")
  

  const navigate=useNavigate()
  const {loading,handleRegister}=useAuth()

    const handleSubmit = (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }


        handleRegister({password,username,email})
        navigate("/")
    };

    if(loading) {
  return (
    <Loading/>
  ) 
}


    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create Account
                </h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            onChange={(e)=>{setusername(e.target.value)}}
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            onChange={(e)=>{setemail(e.target.value)}}
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            onChange={(e)=>{setpassword(e.target.value)}}
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Re-enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Register
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Already have an account?<Link to={"/login"} >   
                    <a href="#" className="text-blue-600 hover:underline">
                        Sign in
                    </a>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;