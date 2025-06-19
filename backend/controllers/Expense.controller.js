import express from "express"
import { Expense } from "../models/Expense.model.js";
import xlsx from "xlsx"

const addExpense = async (req , res)=>{
    const userId = req.user._id ;
    try {
        const {icon , catagory , amount , date }= req.body
        if(!catagory || !amount || !date){
            return res.status(400).json({
                message:"catagory , amount and date are requried"
            })
        }

        const expense = await Expense.create({
            userId,
            icon :icon ||null ,
            catagory ,
            amount , 
            date
        })

        res.status(201).json({
            message:"expense added successfully",
            expense
        })

    }catch(e){
        return res.status(500).json({
            message:"internal server error " + e
        })
    }
}

const viewAllExpense = async (req , res)=>{

    const userId = req.user._id
    try {
        const expense = await Expense.find({userId}).sort({date:-1});
        res.status(200).json({
            message:"all expense are got",
            expense
        })
    } catch (error) {
        res.status(500).json({
            message:"internal server error " + error
        })
    }
    
}

const deleteExpense = async (req , res)=>{
    try {
        await Expense.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"expense is deleted"
        })
    } catch (error) {
        res.status(500).json({
            message:"internal server error " + error
        })
    }
    
}

const expenseToexcel = async (req , res)=>{
    const userId = req.user._id

    try {
        const allexpense = await Expense.find({userId}).sort({date:-1})
        const data = allexpense.map((item)=>({
            catagory :item.catagory,
            amount : item.amount ,
            date : item.date
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)

        xlsx.utils.book_append_sheet(wb ,ws , "Expense")
        xlsx.writeFile(wb , "expense_details.xlsx")
        res.download("expense_details.xlsx")


    } catch (error) {
        res.status(500).json({
            message:"internal server error " + error
        })
    }
}

export {
    addExpense ,
    viewAllExpense ,
    deleteExpense ,
    expenseToexcel 
}

