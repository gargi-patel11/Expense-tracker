import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { API_PATH } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect } from "react";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";

import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../utils/heiper";
import InfoCard from "../../components/cards/InfoCard";
import RecentTransaction from "../../components/Dashboard/RecentTransaction";
import FinanceOverView from "../../components/Dashboard/FinanceOverView";
import ExpenseTransections from "../../components/Dashboard/ExpenseTransections";
import Last30daysexpense from "./Last30daysexpense";
import RecentIncomeWithChart from "./RecentIncomeWithChart";
import RecentIncome from "./RecentIncome";

export default function Home() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setloading] = useState(false);

  const fetchdashboaedData = async () => {
    if (loading) return;

    try {
      setloading(true);
      const response = await axiosInstance.get(API_PATH.DASHBOARD.GET_DATA);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("something went wrong ", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchdashboaedData();
    return () => {};
  }, []);

  return (
    <div>
      <DashboardLayout activemenu="dashboard">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            <InfoCard
              icon={<IoMdCard />}
              lable="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
              color="bg-violet-600"
            ></InfoCard>

            <InfoCard
              icon={<LuWalletMinimal />}
              lable="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
              color="bg-orange-500"
            ></InfoCard>

            <InfoCard
              icon={<LuHandCoins />}
              lable="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
              color="bg-red-500"
            ></InfoCard>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
            <RecentTransaction
              transactions={dashboardData?.recentTransection}
              onSeeMore={() => {
                navigate("/expense");
              }}
            />

            <FinanceOverView
              totalbalance={dashboardData?.totalBalance}
              totalincome={dashboardData?.totalIncome}
              totalexpense={dashboardData?.totalExpense}
            />

            <ExpenseTransections
              transactions={dashboardData?.last30daysexpense?.transection || []}
              onSeeMore={() => {
                navigate("/expense");
              }}
            />

            <Last30daysexpense
              transactions={dashboardData?.last30daysexpense?.transection || []}
            />

            <RecentIncomeWithChart
              data={dashboardData?.last30daysIncome?.transection || []}
              totalincome={dashboardData?.totalIncome}
            />

            <RecentIncome
              transactions={dashboardData?.last30daysIncome?.transection ||[]}
              onSeeMore={() => {
                navigate("/income");
              }}
            />
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
