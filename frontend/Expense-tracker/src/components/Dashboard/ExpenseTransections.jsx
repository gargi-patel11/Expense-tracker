import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import moment  from 'moment'

export default function ExpenseTransections({transactions ,onSeeMore}) {
  return (
    <div className='bg-white p-6 rounded-2xl shadow-md shadow-gray-500 border border-gray-200/50'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Expenses</h5>
            <button className='flex items-center gap-3 text-[12px] font-medium text-gray-700 hover:text-purple-500 bg-gray-50 hover:bg-purple-50 px-4 py-1.5 rounded-lg border border-gray-200/50 cursor-pointer' onClick = {onSeeMore}>See All <LuArrowRight className='text-base'></LuArrowRight></button>
        </div> 
        <div className='mt-6'>
            {transactions?.slice(0,5).map((expense)=>(
                <TransactionInfoCard
                    key={expense._id}
                    title ={expense.catagory}
                    icon ={expense.icon}
                    date={moment(expense.date).format("DD MM YYYY")}
                    amount={expense.amount}
                    type="expense"
                    hiddenDeleteBtn
                    />
            ))}
            
                
        </div>
      
    </div>
  )
}
