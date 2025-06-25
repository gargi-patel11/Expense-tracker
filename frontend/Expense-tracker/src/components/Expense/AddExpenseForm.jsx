import React, { useState } from 'react'
import EmojiPicketrPopUp from '../layouts/EmojiPicketrPopUp'

export default function AddExpenseForm({onAddExpense}) {
    const [expense , setExpense] = useState({
        catagory:"" ,
    amount:0, 
    date :"" , 
    icon:""
    })

    const handleChange =(key , value)=>{
    setExpense({...expense , [key] : value})
}
  return (
   <div>
           <EmojiPicketrPopUp 
               icon={expense.icon}
               onSelect = {(selectedIcon)=>handleChange("icon" , selectedIcon)} />
            <label
                 htmlFor="catagory"
                 className="block text-sm font-medium text-gray-700 mb-1"
               >
                 Category
               </label>
         <input id='catagory' name='catagory' type="text" value={expense.catagory} 
         onChange={({target})=> handleChange("catagory" ,target.value )}
         className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400'
         placeholder='freelance , salary ,etc'
         />
          <label
                 htmlFor="amount"
                 className="block text-sm font-medium text-gray-700 mb-1"
               >
                 Amount
               </label>
         <input type="number" id='amount' name='amount'
         value={expense.amount} 
         onChange={({target})=> handleChange("amount" ,target.value )}
         className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400'
          />
           <label
                 htmlFor="date"
                 className="block text-sm font-medium text-gray-700 mb-1"
               >
                 Date
               </label>
           <input type="date" id='date ' name = 'date'
         value={expense.date} 
         className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400'
         onChange={({target})=> handleChange("date" ,target.value )}
          />
   
          <div 
          className='flex justify-end mt-6'>
           <button 
               type='button'
               className='flex items-center gap-1.5 text-xs md:text-sm font-medium text-purple-600 whitespace-nowrap bg-purplr-50 border border-purple-100 rounded-lg px-4 py-2 cursor-pointer text-white bg-violet-600 ' 
               onClick={()=>onAddExpense(expense)}
               >Add Expense</button>
                   </div>
   
       </div>
  )
}
