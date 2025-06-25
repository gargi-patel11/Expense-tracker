import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/heiper'
import CustomBarChart from '../../components/charts/CustomBarChart'

export default function Last30daysexpense({transactions}) {
    const [charData , setCharData]=useState([])
    useEffect(()=>{
        const result=prepareExpenseBarChartData(transactions)
        setCharData(result)

        return ()=>{};
    },[transactions])
  return (
    <div className='bg-white p-6 rounded-2xl shadow-md shadow-gray-500 border border-gray-200/50 col-span-1'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Last 30 Days Expense</h5>
      </div>
      <CustomBarChart data={charData} />
    </div>
  )
}
