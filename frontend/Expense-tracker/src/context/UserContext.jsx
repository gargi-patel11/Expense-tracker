import { useState } from "react";
import { createContext } from "react";
import { useEffect } from 'react';

export const UserContext = createContext();

const UserProvider =({children})=>{
    const [user , setuser ]= useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    })

    useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

    const updateUser = (userdata)=>{
        setuser(userdata);
    }

    const clearUser = ()=>{
        setuser()
    }

    return(

        <UserContext.Provider value= {{
            user ,
            updateUser , 
            clearUser ,
        }}>
            {children}
        </UserContext.Provider>
    
    )
}

export default UserProvider ; 