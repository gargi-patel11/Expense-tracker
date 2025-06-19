import { useState } from "react";
import { createContext } from "react";
export const UserContex = createContext();

const UserProvider =({children})=>{
    const [user , setuser ]= useState(null)

    const updateUser = (userdata)=>{
        setuser(userdata);
    }

    const clearUser = ()=>{
        setuser()
    }

    return(

        <UserContex.Provider value= {{
            user ,
            updateUser , 
            clearUser ,
        }}>
            {children}
        </UserContex.Provider>
    
    )
}

export default UserProvider ; 