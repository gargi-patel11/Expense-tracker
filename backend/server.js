import dotenv from "dotenv" 
dotenv.config();
import express from "express"
import cors from "cors" ;
// import connectDB  from "./config/db";
import connectDB from "./config/db.js" ;
import cookieParser from "cookie-parser"

const app= express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({extended:true , limit:"16kb"}));

const PORT = process.env.PORT || 5000;

connectDB();


import authrouter from "./routers/auth.router.js" 
import incomeRouter from "./routers/income.router.js"
import expenseRouter from "./routers/expense.router.js"
import dashboardrouter from "./routers/dashboard.router.js"
app.use("/api/v1/auth" , authrouter);
app.use("/api/v1/dashboard" , dashboardrouter);
app.use("/api/v1/income" , incomeRouter);
app.use("/api/v1/expense" , expenseRouter);





app.listen(PORT, ()=>{
    console.log(`server is running on port http://localhost:${PORT} please check it out `);
})

