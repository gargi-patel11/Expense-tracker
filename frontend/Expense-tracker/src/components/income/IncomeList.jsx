import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import moment from 'moment'

export default function IncomeList({transactions , onDelete , onDownload}) {
  return (
    <div className='bg-white p-6 rounded-2xl shadow-md shadow-gray-500 border border-gray-200/50'>
        <div className='flex items-center justify-between '>
            <h5 className='text-lg'>Income sources</h5>
            <button className='flex items-center gap-3 text-[12px] font-medium text-gray-700 hover:text-purple-500 bg-gray-50 hover:bg-purple-50px-4 py-1.5 rounded-lg border border-gray-200/50 cursor-pointer' onClick = {onDownload}>
    <LuDownload className='text-base' />Download
            </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            {transactions.allincome?.map((income)=>{
                return (<TransactionInfoCard
                key = {income._id}
                title = {income.source}
                icon = {income.icon}
                date = {moment(income.date).format("do MMM YYYY")}
                amount={income.amount}
                type ="Income"
                onDelete={()=>onDelete(income._id)} />)



            })} 
        </div>
      
    </div>
  )
}
