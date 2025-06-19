import Router from "express"
import { protectedroute } from "../middlewares/auth.middleware.js";
const router = Router();


import {
    alldashboarddata
} from "../controllers/dashboard.controller.js"

router.post("/alldata" , protectedroute , alldashboarddata)

export default router ;