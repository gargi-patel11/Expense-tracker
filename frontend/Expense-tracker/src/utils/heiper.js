import moment from "moment"
const validateEmail = (email)=>{
    let regex1 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex1.test(email);
};

const getInitials =(name)=>{
    if(!name)return "";

    const word = name.split(" ");
    let initial= "" ; 
    for( let i = 0 ; i< Math.min(2 , word.length)  ; i++){
        initial += word[i][0];
    }

    return initial.toUpperCase();
}

const addThousandsSeparator = (num)=>{
    if(num ==null || isNaN(num)) return "" ; 
    const [integerpart , fractionpart] = num.toString().split(".") ; 
    const formatedInteger = integerpart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return fractionpart
        ?`${formatedInteger}.${fractionpart}`:formatedInteger ;

}

const prepareExpenseBarChartData =(data =[])=>{
    const chartData = data.map((item)=>({
        source :item.catagory , 
        amount : item.amount
    }))

    return chartData ;
}

// helper.js or prepareIncomeChartData.js


const prepareIncomeChartData = (data = []) => {
  if (!Array.isArray(data)) {
    console.warn("Invalid data passed:", data)
    return []
  }

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  )

  const chartData = sortedData.map(item => ({
   source: item.source ,
    amount: item.amount,
     month: moment(item.date).format("Do MMM")
  }))

  return chartData
}


const prepareExpenseLineChartData = (data=[])=>{
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  )

  const chartData = sortedData.map(item => ({
   catagory: item.catagory ,
    amount: item.amount,
     month: moment(item.date).format("Do MMM")
  }))

  return chartData

}
export {validateEmail ,
    getInitials,
    addThousandsSeparator ,
    prepareExpenseBarChartData , 
    prepareIncomeChartData, 
    prepareExpenseLineChartData
};