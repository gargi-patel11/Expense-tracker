import express from "express"
import { Income } from "../models/Income.model.js"
import { Expense } from "../models/Expense.model.js"
import { Types } from "mongoose"
import { isValidObjectId } from "mongoose"

const alldashboarddata = async(req , res)=>{

    const userId = req.user?._id
    const userobjectid = new  Types.ObjectId(String(userId))

    const totalIncome = await Income.aggregate([
        {$match:{userId :userobjectid}},
        { $group : {_id:null , total : { $sum : "$amount"}}}
    ])


    const totalExpense = await Expense.aggregate([
        {$match :{userId : userobjectid}},
        {$group : {_id :null ,total : { $sum: "$amount" }}}
    ])


    //get all income of last 60 days 
    const last60daysincome = await Income.find({userId , 
        date : {$gte : new Date(Date.now() - 60 * 24 *60*60*1000)}
    }).sort({date : -1})

    //total income for last 60 days 
    const totalIncomeforlast60days = last60daysincome.reduce(
        (sum , transection) => sum + transection.amount,
        0
    )

    //get all expense of last 60 days 
    const last60daysexpense = await Expense.find({
        userId , 
        date:{ $gte : new Date(Date.now() - 60 * 24* 60 *60 *1000)}

    }).sort({date : -1})

    //total expense of last 60 days 

    const totalexpenseoflast60days = last60daysexpense.reduce(
        (sum , transection ) => sum + transection.amount ,
        0
    )

   const recentIncomes = await Income.find({ userId })
  .sort({ date: -1 })
  .limit(5);

const recentExpenses = await Expense.find({ userId })
  .sort({ date: -1 })
  .limit(5);

const lastfive = [
  ...recentIncomes.map((txn) => ({
    ...txn.toObject(),
    type: "Income",
  })),
  ...recentExpenses.map((txn) => ({
    ...txn.toObject(),
    type: "Expense",
  })),
].sort((a, b) => new Date(b.date) - new Date(a.date));


    //final response 

    res.status(200).json({
        totalBalance : (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0 ),
        totalIncome : totalIncome[0]?.total || 0 , 
        totalExpense: totalExpense[0]?.total || 0 , 
        last30daysIncome :{
            total : totalIncomeforlast60days ,
            transection : last60daysincome 
        } , 
        last30daysexpense : {
            total : totalexpenseoflast60days , 
            transection : last60daysexpense
        },
        recentTransection : lastfive 
    })

}

export {alldashboarddata}