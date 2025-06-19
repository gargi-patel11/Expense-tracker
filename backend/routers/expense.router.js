import express from "express"
import Router from "express"
import {protectedroute} from "../middlewares/auth.middleware.js"

const router = Router()

import {
    addExpense,
    viewAllExpense,
    deleteExpense ,
    expenseToexcel
} from "../controllers/Expense.controller.js"

router.post("/add" , protectedroute , addExpense)
router.get("/view" , protectedroute , viewAllExpense)
router.get("/excel" , protectedroute , expenseToexcel)


router.get("/:id" , protectedroute , deleteExpense)

export default router;
