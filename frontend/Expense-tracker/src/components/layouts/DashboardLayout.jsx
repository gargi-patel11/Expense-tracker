import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Navbar from './Navbar';
import Sidemenu from './Sidemenu';

function DashboardLayout({children , activemenu}) {
    const user = useContext(UserContext) ;
  return (
    <div className=''>
      <Navbar activemenu={activemenu}/>
      {user && (
        <div className='flex'>
            <div className='max-[1080px]:hidden'>
                <Sidemenu activemenu = {activemenu} />

            </div>
            <div className='grow mx-5'> {children}</div>

        </div>
      )}
    </div>
  )
}

export default DashboardLayout
