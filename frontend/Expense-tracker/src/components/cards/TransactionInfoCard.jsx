import React from 'react'
import { LuUtensils , LuTrendingUp , LuTrendingDown ,LuTrash2  } from 'react-icons/lu'

export default function TransactionInfoCard({
      title,
    icon ,
    date,
    amount ,
    type,
    hiddenDeleteBtn , 
    onDelete
}) {
    const getAmountStyles =()=> type==="Income"? "bg-green-50 text-green-500":"bg-red-50 text-red-500";
  return (
    <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60'>
        <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-purple-50 rounded-full '>
            
            {icon? (<img src={icon} alt={title} className='w-6 h-6' ></img>):(<LuUtensils/>)}
        </div>
        <div className='flex-1 flex items-center justify-between '>
            <p className='text-sm text-gray-700 font-medium'>{title}</p>
            <p className='text-xs text-gray-400 mt-1'>{date}</p>
        </div>

        <div className='flex items-center gap-2'>
            
            {!hiddenDeleteBtn &&(
                <button className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ' onClick={onDelete} >
                    <LuTrash2 size={18}/>
                </button>
            )}

            <div className={`flex items-center gap-3 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                <h6 className='text-xs font-medium'>{type === "Income" ? '+' : '-'}{amount}</h6>
                {type==="Income" ? <LuTrendingUp />:<LuTrendingDown />}
            </div>
        </div>
    </div>
  )
}
