import React from 'react'
import CustomPieChart from '../charts/CustomPieChart'
const Colors = ['#875CF5' , '#FA23C7' ,'FF69000']
export default function FinanceOverView({totalbalance , totalincome , totalexpense}) {
    const balanceData = [
        {name:"Total Balance" , amount: totalbalance},
        {name:"Total Income" , amount: totalincome},
        {name:"Total Expense" , amount: totalexpense}
        
    ]

  return (
    <div className='bg-white p-6 rounded-2xl shadow-md shadow-gray-500 border border-gray-200/50'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Finance Overview</h5>
        </div>
        <CustomPieChart 
            data={balanceData} 
            lable ="Total Balance"
            totalAmount = {`${totalbalance}`}
            colors = {Colors}
            showTextAnchor
        />
      
    </div>
  )
}
