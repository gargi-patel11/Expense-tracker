import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { Router } from "express";

import {protectedroute} from "../middlewares/auth.middleware.js"

const router = Router();
import  {
    loginuser ,
    registeruser,
    getuser,
    logoutuser
}from '../controllers/auth.controller.js';

router.post("/login",upload.none(),loginuser)
router.post("/register" ,  upload.fields([{ name: "profileimageurl", maxCount: 1 }]) ,registeruser)
router.post("/logout" , logoutuser)
router.post("/getuser" , protectedroute , getuser)

export default router;


