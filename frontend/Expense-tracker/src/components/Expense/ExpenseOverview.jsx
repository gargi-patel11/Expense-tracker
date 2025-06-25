import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartData } from '../../utils/heiper';
import CustomLineChart from '../charts/CustomLineChart';
import { LuPlus } from 'react-icons/lu';

export default function ExpenseOverview({transactions , onAddExpense}) {
    const [charData , setCharData] = useState([])

    useEffect(()=>{
        const result = prepareExpenseLineChartData(transactions) ; 
        setCharData(result)
        return ()=>{}
    },[transactions])
  return (
    <div className='bg-white p-6 rounded-2xl shadow-md shadow-gray-500 border border-gray-200/50'>
      <div className='flex items-center justify-between '>
        <div className=''>
        <h5 className='text-lg'>Expense Overview</h5>
        <p className='text-xs text-gray-400 mt-0.5'>Track your spendings over time ans gain insights into where your money gose </p>
      </div>
      <button className='flex items-center gap-1.5 text-xs md:text-sm font-medium text-purple-600 whitespace-nowrap bg-purplr-50 border border-purple-100 rounded-lg px-4 py-2 cursor-pointer'
      onClick={onAddExpense}
      >
        <LuPlus className='text-lg'/>
        Add Expense
      </button>
      </div>
      <div className='mt-10'>
        <CustomLineChart data ={charData} />

      </div>
    </div>
  )
}
