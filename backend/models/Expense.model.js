import mongoose, { Schema }  from "mongoose";

const expenseschema = new Schema({
    userId :{
        type : Schema.Types.ObjectId,
        ref :"User",
        requried : true
    },
    icon :{
        type : String
    },
    catagory :{
        type:String ,
        requried:true
    },
    amount :{
        type : Number ,
        requried:true 
    },
    date:{
        type :Date ,
        default : Date.now 
    }
}, {timestamps :true})

export const Expense = mongoose.model("Expense" , expenseschema);