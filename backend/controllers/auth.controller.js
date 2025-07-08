// const { getUser } = require("gh-pages/lib/util");

import { json } from "express";
import { User } from "../models/User.model.js";
import { uploadOnCloudinary , deleteFile } from "../utils/filehandels.js";



const generateAccessAndRefreshToken = async(userId)=>{
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken();
 
    const refreshToken = user.generateRefreshToken();

    return {accessToken , refreshToken}

}



const refreshAccessToken = async(req , res )=>{
    const userrefreshToken = req.cookie.refreshToken || req.body.refreshToken
    if(!userrefreshToken)res.status(400).json({
        message:"refreshtoken is not valid"
    })

    const {accessToken , refreshToken}=generateAccessAndRefreshToken();

    if(!accessToken || !refreshToken) res.status(400).json({
        message:"cannot generate tokens"
    })

    const Option = {
        httpOnly : true ,
        secure :true
    }

    res.status(200).
        cookie("accessToken" , accessToken).
        cookie("refreshToken" , refreshToken).json({
        message:"tokens generated "
        
    })
}

const registeruser = async(req , res)=>{
    
    const {fullname , email , password } = req.body 

     console.log("---- Incoming Register Request ----");
  console.log("Body:", req.body);
  console.log("Files:", req.files);

    if(!fullname || !email || !password ){
        return res.status(400).json({
            message:"data is not sufficient "
        })
    }

    const user =await User.findOne({email});
    if(user){
        return res.status(400).json({
            message:"this email is already used"
        })
    }
    console.log(user);
    
    let profileimageurl = null
    if(req.files?.profileimageurl){
        const localimagepath = req.files.profileimageurl[0].buffer

         profileimageurl =await uploadOnCloudinary(localimagepath);
          console.log("Buffer size:", buffer?.length);
            console.log("Cloudinary Response:", profileimageurl);

    }
    const user1 = await User.create({
        fullname ,
        email,
        password,
        profileimageurl:profileimageurl?.secure_url
    }
    )

       console.log("Created user:", user1);

    const createduser = await User.findById(user1._id).select(
        "-password"
    )

    const {accessToken , refreshToken}= await generateAccessAndRefreshToken(createduser._id);
    const option ={
        httpOnly:false ,
        secure:true
    }
    res.status(201).cookie("accessToken" , accessToken ).
    cookie("refreshToken" , refreshToken ).
    json({
        createduser,
        accessToken:accessToken,
        message:"user created successfully"
    })  
}

const loginuser =async  (req , res)=>{
   
    const {email , password}= req.body;
    
    if(!email || !password) {
        return res.status(400).json({
            message:"email or password requried"
        })
    }
    
    try{

        const user =await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"wrong email"
            })
        }

        const ispasswordcorrect = await user.checkpassword(password);
        if(!ispasswordcorrect){
            return res.status(400).json({
                message:"wrong password"
            })
        }

        const {accessToken , refreshToken } =await generateAccessAndRefreshToken(user._id)

        const option = {
            httpOnly:false,
            secure : true
        }

        const loggedinuser = await User.findById(user._id).select(
        "-password"
    )

        res.status(200)
        .cookie("refreshToken" , refreshToken )
        .cookie("accessToken" , accessToken  )
        .json({
            user:loggedinuser,
            message:"login successfully",
            accessToken:accessToken,  
        })
        
    }
    catch(e){
        res.status(500).json({
            message:"internal server error in register controller " , e 
        })
    }
}

const logoutuser = async (req , res)=>{
    const option = {
        httpOnly: false,
        secure: true,
    };

    return res.status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json({
            message:"user logged out successfully"
        });
}



const getuser =async (req , res)=>{
    try{
        const user =await User.findOne(req.user._id)
        if(!user){
            res.status(400)
            .json({
                message:"user not found"
            })

        }
        res.status(200).json(user)
    }
    catch(e){
        res.status(500).json({
            message:"internal server failer"
        })
    }
}

export {
    loginuser,
    registeruser,
    getuser,
    logoutuser
    
}