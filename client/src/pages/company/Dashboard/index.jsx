import Cards from "./Cards";
import OrderStatsChart from "./OrderGraph";
import RevenueChart from "./RevanuewGraph";
import StockPieChart from "./StockPieChart";
import EmployeeCircleChart from "./EmployeeCircleChart";
import { ToastContainer } from "react-toastify";

const Dashboard = ({ message }) => {
  console.log(message);

  return (
<div className="ml-64" style={{ marginTop: '-15px' }}>
  <ToastContainer />
  <Cards
    stats={{
      income: 12000,
      orders: 45,
      stock: 200,
      absentEmployees: 3,
    }}
  />
  <div className="min-h-screen pl-1 bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto">
   
    <OrderStatsChart />
    <RevenueChart />
    <StockPieChart />
    <EmployeeCircleChart />
  </div>
</div>

  );
};

export default Dashboard;
