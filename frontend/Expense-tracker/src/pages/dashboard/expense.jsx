import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import toast from "react-hot-toast";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Modal from "../../components/layouts/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/Expenselist";
import DeleteAlert from "../../components/layouts/DeleteAlert";

export default function Expense() {
  const [expense, setExpense] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  //get all inome details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_PATH.EXPENSE.GET_ALL_EXPENSE
      );

      setExpense(response.data);
    } catch (error) {
      console.log("something went wrong ", error);
    } finally {
      setLoading(false);
    }
  };

  //handle add income
  const handleAddExpense = async (expense) => {
    const { catagory, amount, date, icon } = expense;

    if (!catagory) {
      toast.error("catagory is requried");
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("amount should be number and grater than 0 ");
    }
    try {
      await axiosInstance.post(API_PATH.EXPENSE.ADD_EXPENSE, {
        catagory,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModal(false);
      toast.success("expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("error in adding income ", error);
    }
  };

  //handle delete income
  const deleteExpense = async (id) => {
    console.log(id);
    try {
      await axiosInstance.get(API_PATH.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.log(
        "something went wrong while deleting income please try again  ",
        error.response
      );
    }
  };

  //handle download income details
  const handleDownloadDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.EXPENSE.DOWNLOAD_EXPENSE , {
        responseType :"blob"
      })
      //
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href=url ;
      link.setAttribute("download" ,"expense_details.xlsx" )
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.log("error while downloading expense details" , error)
      toast.error("Failed to download expense details. Please try again")
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  }, []);
  return (
    <div>
      <DashboardLayout activemenu="Expense">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div className="">
              <ExpenseOverview
                transactions={expense.expense}
                onAddExpense={() => setOpenAddExpenseModal(true)}
              />
            </div>
            <ExpenseList
              transactions={expense.expense}
              onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
              onDownload={handleDownloadDetails}
            />
          </div>

          <Modal
            isOpen={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
            title="Add Expense"
          >
            <AddExpenseForm onAddExpense={handleAddExpense} />
          </Modal>

          <Modal
            title="Delete Expense"
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          >
            <DeleteAlert
              content={"Are you sure you want to delete this Expense details"}
              onDelete={() => deleteExpense(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </DashboardLayout>
    </div>
  );
}
