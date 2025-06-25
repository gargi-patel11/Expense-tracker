import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, redirect, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { validateEmail } from "../../utils/heiper";
import  ProfilePhotoSelector  from "../../../inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance"; 
import { API_PATH } from "../../utils/apiPath";
import { UserContext } from "../../context/UserContext";

export default function SignUp() {
  const [email, setemail] = useState("");
  const [fullname, setfullname] = useState("");
  // const [profilepic, setprofilepic] = useState(null);
  const [password, setpassword] = useState("");
  const [image , setimage] = useState(null);

  const [error, seterror] = useState(null);
  const [showpassword, setshowpassword] = useState(false);
  //  const [file, setFile] = useState(null);


  const navigate = useNavigate();

  const {updateUser} = useContext(UserContext) ; 

  const toggeleshowpassword = ()=>{
    setshowpassword((prev) => !prev);
  }

  //handle signup logic

  const handleSignup = async(e) => {
      e.preventDefault();
    if(!fullname) {
      seterror("Enter fullname first");
      return ;

    }
    if(!validateEmail(email)){
       seterror("Please enter valid email");
       return;
    }
    if(!image){
      seterror("Upload profile image");
      return ;
    }

    seterror("");

  const formData = new FormData();
  formData.append("fullname", fullname);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("profileimageurl", image);
  

    //handeling register api

    try {
      const response =await axiosInstance.post( API_PATH.AUTH.REGISTER ,formData ,
     { headers: {
          'Content-Type': 'multipart/form-data',
        }}
      )

     const {accessToken , createduser} = response.data 
  
     if(response){
        localStorage.setItem("accessToken" , accessToken)
          updateUser(createduser)
          navigate("/dashboard")
     }
    } catch (error) {
      if(error.response && error.response.data.message){
        seterror(error.response.data.message) ;

      }else {
        seterror("Something went wrong! Please try again ")
      }
    }
  };
  return (
    <>
      <AuthLayout >
        <div className="lg:-w[10%] h-3/4 md:h-full flex flex-col justify-center">
          <h3 className="tex
          t-xl font-semibold text-black ">Create your account </h3>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Join us today by entering your details below 
          </p>
          <div className="w-full md:w-[60vw]  ">
            <div className="">
              {error && <p className=" text-red-600">{error}</p>}
            </div>

            <form
              className="flex flex-col gap-6 w-[60vw] md:w-[30vw] mx-auto md:mx-20"
              onSubmit={handleSignup}
            >
              <ProfilePhotoSelector image={image}  setimage={setimage}/>
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Fullname
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={fullname}
                  onChange={(e) => {
                    setfullname(e.target.value);
                  }}
                  placeholder="Enter your fullname"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
                </div>
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
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
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
                  {showpassword ? (
                    <FaRegEye
                      size={22}
                      className="absolute top-10 right-3 transform -translate-y-1/2 text-gray-600"
                      onClick={() => toggeleshowpassword()}
                    />
                  ) : (
                    <FaRegEyeSlash
                      size={22}
                      className="absolute top-10 right-3 transform -translate-y-1/2 text-gray-600"
                      onClick={() => toggeleshowpassword()}
                    />
                  )}
                </label>
                <input
                  value={password}
                  type={showpassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400 "
                />
              </div>

              <button
                type="submit"
                className="bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition"
              >
                sign Up
              </button>
              <p>
                Already have account?{" "}
                <Link className="underline text-purple-700" to="/login">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
