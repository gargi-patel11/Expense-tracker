import jwt from "jsonwebtoken";
import {User} from "../models/User.model.js"
import dotenv from "dotenv"
dotenv.config();

const protectedroute = async(req , res , next)=>{
    const token =  req.cookies?.accessToken ||req.header("Authorization")?.replace(/bearer/i , "").trim()
    if(!token){
 
       return res.status(401).json({
            message:"token is not valid"
        })
    }

    try {
        const decoedtoken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)

        const user =await User.findById(decoedtoken._id).select("-password")

        if(!user){
   
            return res.status(401).json({
            message:"invalid token"
            })
        }
        req.user = user ; 

        next();

    } catch (error) {
        return res.status(500).json({
            message:"internal server error in auth middleware" , error
        })
    }

}
export {protectedroute}