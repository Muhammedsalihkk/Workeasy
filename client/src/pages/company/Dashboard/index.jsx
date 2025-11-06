import Cards from "./Cards";
import OrderStatsChart from "./OrderGraph";
import RevenueChart from "./RevanuewGraph";

const Dashboard = ({ message }) => {
  console.log(message);

  return (
<div style={{ marginTop: '-15px' }}>

  <Cards
    stats={{
      income: 12000,
      orders: 45,
      stock: 200,
      absentEmployees: 3,
    }}
  />
  <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-scroll">
    <RevenueChart />
    <OrderStatsChart />
    <RevenueChart />
    <RevenueChart />
  </div>
</div>

  );
};

export default Dashboard;
