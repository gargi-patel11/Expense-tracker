import axios from "axios"
import {BASE_URL} from "./apiPath"

const axiosInatance = axios.create({
    BASE_URL : BASE_URL,
    timeout : 10000,
    headers :{
        "Content-Type" : "application/json",
        Accept : "application/json"
    }
})


axiosInatance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("accessToken")
        if(accessToken){
            config.headers.Authorization = `bearer ${accessToken}`
        }
        return config

    },
    (error)=>{
        return Promise.reject(error)
    }
)

axiosInatance.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        if(error.response.status === 401){
            window.location.href = "/login";
        }else if( error.response.status === 500){
            console.error("server error. Please try again later ")
        }else if ( error.response.status === "ECONNABORTED"){
            console.error("Request timeout. try again ");
        }
        return Promise.reject(error)
    }

)

export default axiosInatance ; 