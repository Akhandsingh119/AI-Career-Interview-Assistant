import { createBrowserRouter } from "react-router";
import Login from './Auth/Pages/Login'
import Register from "./Auth/Pages/Register";
import Home from "./Auth/Componenets/Home";
import Protected from "./Auth/Componenets/Protected";
import ErrorPage from "./Auth/Componenets/ErrorPage";
import Result from "./Auth/Componenets/Result";
import History from "./Auth/Componenets/History";



export const router=createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },

    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/",
        element:<Protected><Home/></Protected>
    }

,
     {
        path:"/404",
        element:<ErrorPage/>
    },

    {
        path:"/interview/:interviewId",
        element:<Protected><Result/></Protected>
    }
    ,{
        path:"/interview/History/:UserID",
        element:<Protected><History/></Protected>
    }
    
])