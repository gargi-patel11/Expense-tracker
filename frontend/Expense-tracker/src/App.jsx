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
import Home from "./pages/dashboard/home.jsx";
import Income from "./pages/dashboard/income.jsx";
import Expense from "./pages/dashboard/expense.jsx";

function App() {

  return (
    <>
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
    </>
  )
}

export default App

const Root= ()=>{
  const isauthenticated = !!localStorage.getItem("token");

  return isauthenticated ? (<Navigate to='/dashboard'/>):(<Navigate to="/login" />); 
}


