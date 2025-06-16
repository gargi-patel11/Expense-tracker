import mongoose, { Schema } from "mongoose";

const incomeShema = new Schema({
    userId :{
        type:Schema.Types.ObjectId,
        ref:"User",
        requried: true
    },
    icon:{
        type:String
    },
    source:{
        type:String,
        requried:true
    },
    amount:{
        type:Number,
        requried:true
    },
    date:{
        type:Date,
        default: Date.now()
    }

}, {timestamps:true})

export const Income = mongoose.model("Income" , incomeShema)