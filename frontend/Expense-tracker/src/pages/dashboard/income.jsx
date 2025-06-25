import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import IncomeOverview from '../../components/income/IncomeOverview';
import Modal from '../../components/layouts/Modal';
import AddIncomeForm from '../../components/income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/income/IncomeList';
import DeleteAlert from '../../components/layouts/DeleteAlert';

export default function Income() {
  const [income , setIncome]=useState([]) ;
  const [loading , setLoading]=useState(false)
  const [openDeleteAlert , setOpenDeleteAlert] = useState({
    show: false ,
    data : null
  })
  const [openAddIncomeModal,setOpenAddIncomeModal] =useState(false)

  //get all inome details
  const fetchIncomeDetails =async()=>{
    if(loading) return ;

    try {
      setLoading(true)
      const response = await axiosInstance.get(API_PATH.INCOME.GET_ALL_INCOME)
  
      setIncome(response.data)
      
    } catch (error) {
      console.log("something went wrong " , error)
    }finally{
      setLoading(false);
    }

  }

  //handle add income
  const handleAddIncome = async(income)=>{
    const {source , amount , date , icon} = income

    if(!source){
      toast.error("source is requried")
    }

    if(!amount || isNaN(amount) || amount <= 0){
      toast.error("amount should be number and grater than 0 ")
    }
    try{
      await axiosInstance.post(API_PATH.INCOME.ADD_INCOME , {
        source , 
        amount , 
        date , 
        icon 
    })
      setOpenAddIncomeModal(false)
      toast.success("income added successfully")
      fetchIncomeDetails();

    } catch(error){
      console.error("error in adding income " , error.response)
    }
  }

  //handle delete income 
  const deleteIncome =async(id)=>{
    console.log(id)
    try{
      await axiosInstance.get(API_PATH.INCOME.DELETE_INCOME(id)) ; 
      setOpenDeleteAlert({show: false ,
    data : null})
      toast.success("income deleted successfully")
      fetchIncomeDetails()
    }catch(error){
      console.log("something went wrong while deleting income please try again  " , error.response ) ; 
    }

  }

  //handle download income details 
  const handleDownloadDetails = async()=>{
    try {
      const response = await axiosInstance.get(API_PATH.INCOME.DOWNLOAD_INCOME , {
        responseType :"blob"
      })
      console.log(response)
      //
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href=url ;
      link.setAttribute("download" ,"income_details.xlsx" )
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.log("error while downloading expense details" , error)
      toast.error("Failed to download expense details. Please try again")
    }

  }

  useEffect(()=>{
    fetchIncomeDetails()
    return ()=>{}
  },[])
  return (
      <DashboardLayout activemenu="Income">
        <div className="my-5 mx-auto">
          <div className='grid grid-cols-1 gap-6'>
            <div className=''>
              <IncomeOverview 
              transactions ={income.allincome}
              onAddIncome ={()=> setOpenAddIncomeModal(true)}
              />
            </div>
            <IncomeList 
              transactions = {income}
              onDelete = {(id)=> setOpenDeleteAlert({show:true  , data : id})}
              onDownload = {handleDownloadDetails} />
          </div>
          <Modal 
            isOpen = {openAddIncomeModal}
            onClose = {()=>setOpenAddIncomeModal(false)}
            title = "Add Income"
            >
              <AddIncomeForm onAddIncome = {handleAddIncome} />
              </Modal>

              <Modal 
              title="Delete Income"
              isOpen={openDeleteAlert.show}
              onClose={()=> setOpenDeleteAlert({show:false , data:null})}
              >
                <DeleteAlert 
                content = {"are you sure you want to delete this income details"}
                onDelete={()=>deleteIncome(openDeleteAlert.data)} />
              </Modal>
          </div>
          </DashboardLayout>
  )
}
