// export const BASE_URL = "https://expense-tracker-xk8l.onrender.com/"
export const BASE_URL = "http://localhost:8000"

export const API_PATH = {
    AUTH : {
        LOGIN : "api/v1/auth/login", 
        REGISTER : "api/v1/auth/register" , 
        GET_USER_INFO : "api/v1/auth/getuser"
    } ,
    EXPENSE : {
        ADD_EXPENSE : "api/v1/expense/add",
        DELETE_EXPENSE: (expenseID)=> `api/v1/expense/${expenseID}`,
        GET_ALL_EXPENSE : "api/v1/expense/view",
        DOWNLOAD_EXPENSE : "api/v1/expense/excel",
    },
     INCOME : {
        ADD_INCOME : "api/v1/income/add",
        DELETE_INCOME: (incomeID)=> `api/v1/income/${incomeID}`,
        GET_ALL_INCOME : "api/v1/income/view",
        DOWNLOAD_INCOME: "api/v1/income/excel",
    },
    DASHBOARD : {
        GET_DATA : "api/v1/dashboard/alldata"
    } 
}