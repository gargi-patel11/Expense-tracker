import mongoose, {Schema} from "mongoose";

import dotenv from "dotenv"
import jwt from "jsonwebtoken"

import bcrypt from "bcryptjs";

const userschema = new Schema(
    {
        fullname:{
            type:String,
            requried:true
        },
        email:{
            type:String,
            requried:true,
            unique:true
        },
        password:{
            type:String,
            requried:true
        },
        profileimageurl:{
            type:String,
            default:null
        }
    },{
        timestamps:true
    }
)

userschema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password =await bcrypt.hash(this.password , 10);
    next();
})

 userschema.methods.checkpassword= async function (password){
   return await bcrypt.compare(password , this.password);
}

userschema.methods.generateAccessToken = function(){
    return jwt.sign({
            _id :this._id
        },
        process.env.ACCESS_TOKEN_SECRET ,
        {
            expiresIn:process.env.ACCESS_TOKEN_DURATION
        }
    
    )

}

userschema.methods.generateRefreshToken = function(){
    return jwt.sign({
            _id :this._id
        },
        process.env.REFRESH_TOKEN_SECRET ,
        {
            expiresIn:process.env.REFRESH_TOKEN_DURATION
        }
    
    )

}
export const User = mongoose.model("User" , userschema);

