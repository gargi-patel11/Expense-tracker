import React from 'react'
import CustomToolTip from './CustomToolTip'
import CustomLegend from './CustomLegend'
import {
    PieChart , 
    Pie , 
    Cell ,
    Tooltip , 
    ResponsiveContainer ,
    Legend
} from "recharts"

export default function CustomPieChart({data ,
            lable ,
            totalAmount ,
            colors ,
            showTextAnchor}) {
  return (
   <ResponsiveContainer width="100%" height = {380}>
   <PieChart >
    <Pie
        data={data}
        dataKey="amount"
        namekey ="name" 
        cx="50%"
        cy="50%"
        outerRadius ={130}
        innerRadius={100}
        lableLine ={false}
        >
            {data.map((entry , index)=>{
            return <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
            })}
            </Pie>
            <Tooltip content={CustomToolTip}/>
            <Legend 
            // content={CustomLegend}
            />

            {showTextAnchor &&(
                <>
                <text
                    x="50%"
                    y="50%"
                    dy={-25}
                    textAnchor='middle'
                    fill="#666"
                    fontSize="14px" >
                {lable}
                </text>
                <text
                    x="50%"
                    y="50%"
                     dy={8}
                    textAnchor='middle'
                    fill="#333"
                    fontSize="14px"
                    fontWeight="semi-bold" >
                {totalAmount}
                </text>
                </>
            )}
            </PieChart>
        </ResponsiveContainer>
  )
}
