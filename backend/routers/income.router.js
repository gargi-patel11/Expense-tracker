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

router.post("/add" ,protectedroute, addIncome)
router.get("/view",protectedroute , viewAllIncome)
router.get("/excel",protectedroute , getincomeexcel)

router.get("/:id",protectedroute , deleteIncome)

export default router ;


