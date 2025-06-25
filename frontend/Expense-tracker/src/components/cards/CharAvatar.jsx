import React from 'react'
import { getInitials } from '../../utils/heiper'

export default function CharAvatar({fullname , width , height , style}) {
  return (
    <div className={`${width || w-20 } ${height ||h-20} ${style || ""} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}>
        {getInitials(fullname||"")}
      
    </div>
  )
}
