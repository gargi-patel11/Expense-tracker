import { useState } from 'react';
import './index.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  redirect
} from "react-router-dom";
import Login from "./pages/auth/login.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import Home from "./pages/dashboard/Home.jsx";
import Income from "./pages/dashboard/income.jsx";
import Expense from "./pages/dashboard/expense.jsx";
import UserProvider from './context/UserContext.jsx';
import {Toaster } from "react-hot-toast"

function App() {

  return (
    <>
    <UserProvider>
<div>
      <Router>
        <Routes>
          <Route path='/' element={<Root/>}/> 
          <Route path='/login' exact element={<Login />}/>
          <Route path='/signUp' exact element={<SignUp />}/>
          <Route path='/dashboard'  exact element={<Home />}/>
          <Route path='/income' exact element={<Income />}/>
          <Route path='/expense' exact element={<Expense />}/>
        </Routes>
      </Router>
</div>
<Toaster 
      toastOpetions={{
        className :"" , 
        style :{
          fontSize : "13px"
        }
      }}
/>
      </UserProvider>
    </>
  )
}

export default App

const Root= ()=>{
  const isauthenticated = !!localStorage.getItem("accessToken");

  return isauthenticated ? (<Navigate to='/dashboard'/>):(<Navigate to="/login" />); 
}


