import React, { useState } from 'react'
import {HiOutlineMenu , HiOutlineX} from "react-icons/hi"
import Sidemenu from './Sidemenu';

function Navbar({activemenu}) {
      const [openSideMenu , setOpenSideMenu] = useState(false);

  return (

    <div className='flex gap-5 bg-white  backdrop-blur-[2px] py-4 px-7 sticky top-0  z-30'>
      <button 
      className='block lg:hidden text-black'
      onClick={(e)=>{setOpenSideMenu(!openSideMenu)}}
      >
       { openSideMenu ? <HiOutlineX className='text-2xl' > </HiOutlineX> : <HiOutlineMenu className='text-2xl'></HiOutlineMenu>}
      </button>
      <h2 className='text-lg font-medium text-black'> Expense Tracker</h2>
       {openSideMenu && 
        <div className='fixed top-[61px] -ml-4 bg-white'>
          <Sidemenu activemenu ={activemenu} />

        </div>
       }
    </div>
  )
}

export default Navbar


