import React from 'react'
import {
    XAxis ,
    YAxis , 
    Tooltip , 
    ResponsiveContainer  , 
    CartesianGrid , Area ,
    AreaChart, 
    LineChart
 
} from "recharts"


export default function CustomLineChart({data}) {
    const  CustomToolTip=({active , payload}) =>{
    if(active && payload && payload.length){
  return (
    <div className='bg-white shadow-mg rounded-lg p-2 border border-border-300'>
        <p className='text-xs font-semibold text-purple-800 mb-1'>
        {payload[0].payload.catagory}
        </p>
        <p className='text-sm test-gray-600'>
            Amount: <span className='text-sm font-medium text-gray-900'>{payload[0].value}</span>
        </p>
      
    </div>
  )}
  return null
} ;
  return (
   <div className='bg-white'>
    <ResponsiveContainer width="100%" height={300}>
        <AreaChart data = {data}>
            <defs >
                <linearGradient id="incomeGradiant" x1="0" y1="0" x2="0" y2="1" >
                <stop offset="5%" stopColor = "#875cf5" stopOpacity = {0.4}/>
                <stop offset="95%" stopColor = "#875cf5" stopOpacity = {0}/>
                </linearGradient>
                </defs>
                
                <CartesianGrid stroke='none' />
                <XAxis dataKey="month" tick={{fontSize:12 ,fill :"#555"}} stroke="none" />

                <YAxis tick={{fontSize:12 ,fill :"#555"}} stroke="none" />
                <Tooltip content={<CustomToolTip />} />

                <Area type="monotone" dataKey="amount" stroke = "#857cf5" fill="url(#incomeGradiant)" strokeWidth = {3} dot ={{r:3 , fill:"#ab8df8"}} />
                </AreaChart>
                </ResponsiveContainer>




   </div>
  )
}
