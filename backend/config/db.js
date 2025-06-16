import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
const connectDB=async() =>{
    try{
        await mongoose.connect(process.env.DB_CONNECTIONSTRING , {});
        console.log("dabase connected ");
    }
    catch(e){
        console.log("error while connecting database " , e);
    }
}

export default connectDB;