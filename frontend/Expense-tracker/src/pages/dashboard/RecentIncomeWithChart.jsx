import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import CustomPieChart from '../../components/charts/CustomPieChart'
const COLORS = ["#875CF5" , "#FA2C37" ,"#FF6900" , "#4F39F6"]
export default function RecentIncomeWithChart({data , totalincome}) {
     const [charData , setCharData]=useState([])
     const prepareChartData = ()=>{
        const dataarr = data?.map((item)=>({
            name : item?.source , 
            amount :item?.amount
        }))
        setCharData(dataarr);
     }

    useEffect(()=>{
       
        prepareChartData();

        return ()=>{};
    },[data])
  return (
    <div className='bg-white p-6 rounded-2xl shadow-md shadow-gray-500 border border-gray-200/50 ; '>
        <div className='flex items-center justify-between '>
            <h5 className='text-lg'>Last 60 Days Income</h5>
        </div>
        <CustomPieChart 
            data = {charData}
            lable = "total Income"
            totalAmount = {`${totalincome}`}
            colors = {COLORS}
            showTextAnchor
        />
      
    </div>
  )
}
