import React from 'react'
import {
    BarChart , 
    Bar , 
    XAxis , 
    YAxis , 
    CartesianGrid , 
    Tooltip ,
    Legend ,
    ResponsiveContainer , 
    Cell , 

} from "recharts"
// import CustomToolTip from './CustomToolTip'

export default function CustomBarChart({data}) {
    const getBarColor =(index)=>{
        return index%2 === 0 ? "#975cf5" :"#cfbefb"
    }

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
    <div className='bg-white mt-6'>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data = {data}>
                <CartesianGrid stroke='none' />
                <XAxis dataKey="source" tick={{fontSize :12 , fill:"#555"}} stroke = "none" />

                <YAxis  tick={{fontSize :12 , fill:"#555"}} stroke = "none" />

                <Tooltip content={CustomToolTip}/>
                <Bar 
                    dataKey = "amount"
                    fill ="#FF8042"
                    radius = {[10 ,10, 0 ,0]}
                    activeDot ={{r:8 , fill : "yellow"}}
                    activeStyle ={{fill : "green"}}
                    >
                        {data.map((entry , index)=>(
                            <Cell key={index} fill={getBarColor(index)} />
                        ))}
                        </Bar>
                        </BarChart>
</ResponsiveContainer>
      
    </div>
  )
}
