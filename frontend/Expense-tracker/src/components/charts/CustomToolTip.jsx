import React from 'react'

export default function CustomToolTip({active , payload}) {
    if(active && payload && payload.length){
  return (
    <div className='bg-white shadow-mg rounded-lg p-2 border border-border-300'>
        <p className='text-xs font-semibold text-purple-800 mb-1'>
        {payload[0].name}
        </p>
        <p className='text-sm test-gray-600'>
            Amount: <span className='text-sm font-medium text-gray-900'>${payload[0].value}</span>
        </p>
      
    </div>
  )}
  return null
}
