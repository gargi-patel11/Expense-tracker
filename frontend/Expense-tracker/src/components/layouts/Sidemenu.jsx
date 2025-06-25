import React, { useContext } from 'react'
import { SIDE_MENU_DATA } from '../../utils/data' ;
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../cards/CharAvatar';

function Sidemenu({activemenu}) {
  const {user , clearuser } = useContext(UserContext);
  const navigate = useNavigate() ; 

  const handleclick= (route)=>{
    if(route === "/logout"){
      handlelogout() ;
      return ; 
    }
    navigate(route)
  }
  const handlelogout =()=>{
    localStorage.clear() ; 
    clearuser;
    navigate('/login') ;
    return ; 

  }

  return (
    <div className='w-64 h-[calc(100vh-61px)bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20'>
      <div className='flex flex-col items-center gap-3  mb-5'>
        {user?.profileimageurl ? (<img src={user?.profileimageurl || ""} alt='profile image' className='w-20 h-20 bg-slate-400 rounded-full' ></img>) :(<CharAvatar fullname= {user?.fullname} width="w-20" height="h-20" style="text-xl"  ></CharAvatar>)}
        
        <h5 className='text-grey-950 fornt-medium leading-6'>{user?.fullname || "empty"}</h5>

      </div>
      
      {SIDE_MENU_DATA.map((item , index)=>{
        return (
        <button
          key = {`menu_${index}`}
          className={`w-full flex item-center gap-4 text-[15px] ${activemenu == item.lable ? "text-white bg-violet-600" : ""} py-3 px-6 rounded-lg mb-3`} 
          onClick={()=>{handleclick(item.path)}}
          >
            <item.icon className='text-xl'/>
            {item.lable}
          </button>
        )
      })}
    </div>
  )

}

export default Sidemenu
