import React from "react";
import columnbg from "../../assets/images/columnbg.png";
import { LuTrendingUpDown } from "react-icons/lu";

const NotifyCard = ({ icon, lable, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-6 rounded-xl shadow-md shadow-purple-400/10 z-10">
      <div
        className={`w-12 h-12 flex item-center justify-center text-[26px] bg-violate-500 rounded-full drop-shadow-xl pt-3 bg-violet-600 `}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-s text-grey-500 mb-1">{lable}</h6>
        <span className="text-[20px]">{value}</span>
      </div>
    </div>
  );
};

const AuthLayout = ({ children }) => {
  return (
    <div className="flex ">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 ">
        <h2 className="text-lg font-medium text text-black ">
          Expense Tracker
        </h2>
        {children}
      </div>
      <div className="hidden md:block w-[40vw] hscreen bg-auth-bg-img  bg-violet-50 bg-cover bg-no-reapet bg-center overflow-hidden p-8 relative">
        <div className="grid grid-cols-1 z-20 ">
          <NotifyCard
            icon={<LuTrendingUpDown />}
            lable="Track your Expense here"
            value="430,000"
            color="bg-primary"
          />
        </div>
        <div className="h-48 w-48 bg-purple-600 rounded-[40px] absolute -top-7 -left-6"></div>
        <div className="h-56 w-48 border-[20px] border-fuchsia-600 absolute top-[30%] -right-10 rounded-[40px]"></div>
        <div className="h-48 w-48 bg-violet-500 rounded-[40px] absolute -bottom-7 -left-5"></div>
        <img
          src={columnbg}
          alt="bg"
          className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
