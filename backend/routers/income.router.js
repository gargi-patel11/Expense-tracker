import express from "express"
import Router from "express"
import { protectedroute } from "../middlewares/auth.middleware.js";

const router = Router();

import {
    addIncome ,
    viewAllIncome,
    deleteIncome ,
    getincomeexcel

} from "../controllers/income.controller.js"

router.post("/addincome" ,protectedroute, addIncome)
router.get("/viewallincome",protectedroute , viewAllIncome)
router.get("/deleteincome",protectedroute , deleteIncome)
router.get("/getincomeexcel",protectedroute , getincomeexcel)

export default router ;


