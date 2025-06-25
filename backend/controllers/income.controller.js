import express from "express"
import {Income} from "../models/Income.model.js"
import {User} from "../models/User.model.js"
import xlsx from "xlsx";


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

    const userId= req.user._id

    try{
        const allincome = await Income.find({userId}).sort({date:-1})
        res.status(200).json({
            allincome
        })

    }catch(e){
        res.status(500).json({
            message:"internal server error " + e 
        })
    }


}

const deleteIncome = async (req , res)=>{
    try{
         await Income.findByIdAndDelete(req.params.id)
         res.status(200).json({
            message:"income delete successfully"
         })

    }catch(e){
        res.status(500).json({
            message:"internal server error " + e 
        })
    }

}
const getincomeexcel = async (req , res)=>{
    const userId = req.user._id;

    const allincome = await Income.find({userId}).sort({date:-1})
    const data = allincome.map((item)=>({
        source:item.source,
        amount:item.amount,
        date:item.date
    }))

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data)
    xlsx.utils.book_append_sheet(wb,ws , "Income")
    xlsx.writeFile(wb , "income_details.xlsx")
    res.download("income_details.xlsx")

}

export {
    addIncome,
    viewAllIncome ,
    deleteIncome,
    getincomeexcel
}
