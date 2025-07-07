import axios from "axios"
import {BASE_URL} from "./apiPath"

const axiosInstance  = axios.create({
    baseURL : BASE_URL,
    timeout : 10000,
    headers :{
        "Content-Type" : "application/json",
        Accept : "application/json"
    }
})


axiosInstance.interceptors.request.use(
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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Try again.");
    } else {
      console.error("Network or unknown error:", error.message);
    }

    return Promise.reject(error);
  }
);


export default axiosInstance ; 