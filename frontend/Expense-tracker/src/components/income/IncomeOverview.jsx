import React, { useEffect, useState } from 'react'
import { prepareIncomeChartData } from '../../utils/heiper';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from "../charts/CustomBarChart"

export default function IncomeOverview({transactions , onAddIncome}) {
    const [charData , setCharData] = useState([])

    useEffect(()=>{
        const result = prepareIncomeChartData(transactions) ; 
        setCharData(result)

        return ()=>{}
    },[transactions])
  return (
    <div className='bg-white p-6 rounded-2xl shadow-md shadow-gray-500 border border-gray-200/50'>
      <div className='flex items-center justify-between '>
        <div className=''>
        <h5 className='text-lg'>Income Overview</h5>
        <p className='text-xs text-gray-400 mt-0.5'>Track your earnings over time ans analyze your income trends </p>
      </div>
      <button className='flex items-center gap-1.5 text-xs md:text-sm font-medium text-purple-600 whitespace-nowrap bg-purplr-50 border border-purple-100 rounded-lg px-4 py-2 cursor-pointer'
      onClick={onAddIncome}
      >
        <LuPlus className='text-lg'/>
        Add Income
      </button>
      </div>
      <div className='mt-10'>
        <CustomBarChart data ={charData} />

      </div>
    </div>
  )
}
