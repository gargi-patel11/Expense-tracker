import express from "express"
import {Income} from "../models/Income.model.js"
import {User} from "../models/User.model.js"


const addIncome = async (req , res)=>{
    const userId =req.user._id
        console.log(req.body)
        const {icon , source , amount , date} = req.body
        if(!source || !amount || !date){
            res.status(400).json({
                message:"source , amount and date are requried"
            })
        }

        const addedincome =await Income.create({
            userId,
            icon:icon||null ,
            source ,
            amount ,
            date
        }
        )

        if(!addIncome){
            res.status(400).json({
                message:"income can't added"
            })
        }

        res.status(201).json({
            message:"new income added",
            addedincome
        })
    }


const viewAllIncome = async (req , res)=>{

}

const deleteIncome = async (req , res)=>{

}
const getincomeexcel = async (req , res)=>{

}

export {
    addIncome,
    viewAllIncome ,
    deleteIncome,
    getincomeexcel
}
