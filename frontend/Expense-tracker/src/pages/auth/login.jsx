import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/authLayout";
import { Link, useNavigate } from "react-router-dom";
import {FaRegEye ,FaRegEyeSlash } from "react-icons/fa";
import { validateEmail } from "../../utils/heiper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import axios from "axios";
import {UserContext} from "../../context/UserContext";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const[error , seterror] = useState(null);
  const[showpassword , setshowpassword]=useState(false);

  const {updateUser} = useContext(UserContext)

  const toggeleshowpassword = ()=>{
    setshowpassword((prev) => !prev);
  }

  const navigate = useNavigate();

  const handleLogin = async (e)=>{
    e.preventDefault();
    if(!validateEmail(email)){
      seterror("Please enter a valid email");
      return ;
    }
    if(!password){
      seterror("please enter password");
      return;
    }
    seterror("");

    //handle api response 
    try {
      const response =await axiosInstance.post(API_PATH.AUTH.LOGIN , {
        email  , 
        password 
      })
      const {accessToken , user}  = response.data
    

      if(accessToken){
        localStorage.setItem("accessToken" , accessToken)
        updateUser(user)
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(error)
      if(error.response && error.response.data.message){
        seterror(error.response.data.message)
        
      }else {
        seterror("somthing went wrong , please try again ")
      }
    }
  }


  return (
    <AuthLayout>
      <div className="lg:-w[10%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black ">Welcome Back!</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details for login
        </p>
        <div className="w-full md:w-[60vw]  ">
          <div className="">
            {error && <p className=" text-red-600">{error}</p>}
          </div>

        <form className="flex flex-col gap-6 w-[60vw] md:w-[30vw] mx-auto md:mx-20" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e)=>{setemail(e.target.value)}}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1 "
            >
              Password 
              {showpassword ?(
                <FaRegEye 
              size={22}
              className="absolute top-10 right-3 transform -translate-y-1/2 text-gray-600"
              onClick={()=>toggeleshowpassword()}
              />
            ) :(
                <FaRegEyeSlash
              size={22}
              className="absolute top-10 right-3 transform -translate-y-1/2 text-gray-600"
              onClick={()=>toggeleshowpassword()}
               />
            )}
            </label >
            <input 
              value={password}
              type={showpassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              onChange={(e)=>{setpassword(e.target.value)}}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 "
            />
            
            
          </div>

          
          <button
            type="submit"
            className="bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition"
          >
            Login
          </button>
          <p>
            don't have an account?{" "}
            <Link className='underline text-purple-700' to="/signup" >SignUp </Link>
          </p>
        </form>
        </div>
      </div>
    </AuthLayout>
  );
}
