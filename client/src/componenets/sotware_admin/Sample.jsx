// src/FinancialDashboard.js
import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Owner_profile_get } from '../Redux/Slice/Owner_slices/Profile';

const FinancialDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const {owner_profile_response,loading,error}=useSelector((state)=>state.owner_profile)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(error){
        console.log(error);
    }
    if(owner_profile_response){
        console.log(owner_profile_response)  
    }
    dispatch(Owner_profile_get())

  },[owner_profile_response,error])

  // Mock data for bar chart
  const revenueData = [85000, 92000, 78000, 105000, 110000, 128459, 118000, 125000, 132000, 140000, 145000, 150000];
  const expenseData = [42000, 45000, 48000, 52000, 58000, 64232, 60000, 62000, 65000, 68000, 70000, 72000];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Expense breakdown data
  const expenses = [
    { name: 'Operations', value: 35, amount: '$22,480', color: 'bg-indigo-500' },
    { name: 'Marketing', value: 25, amount: '$16,058', color: 'bg-pink-500' },
    { name: 'Salaries', value: 20, amount: '$12,846', color: 'bg-amber-500' },
    { name: 'Equipment', value: 15, amount: '$9,635', color: 'bg-emerald-500' },
    { name: 'Others', value: 5, amount: '$3,212', color: 'bg-violet-500' }
  ];
  
  // Detailed metrics data
  const metrics = [
    { period: 'December 2023', revenue: '$175,000', expenses: '$74,000', profit: '$101,000', growth: '+12.5%' },
    { period: 'November 2023', revenue: '$165,000', expenses: '$72,000', profit: '$93,000', growth: '+10.8%' },
    { period: 'October 2023', revenue: '$155,000', expenses: '$70,000', profit: '$85,000', growth: '+9.2%' },
    { period: 'September 2023', revenue: '$145,000', expenses: '$68,000', profit: '$77,000', growth: '+8.5%' },
    { period: 'August 2023', revenue: '$135,000', expenses: '$66,000', profit: '$69,000', growth: '+7.8%' },
      { period: 'December 2023', revenue: '$175,000', expenses: '$74,000', profit: '$101,000', growth: '+12.5%' },
    { period: 'November 2023', revenue: '$165,000', expenses: '$72,000', profit: '$93,000', growth: '+10.8%' },
    { period: 'October 2023', revenue: '$155,000', expenses: '$70,000', profit: '$85,000', growth: '+9.2%' },
    { period: 'September 2023', revenue: '$145,000', expenses: '$68,000', profit: '$77,000', growth: '+8.5%' },
    { period: 'August 2023', revenue: '$135,000', expenses: '$66,000', profit: '$69,000', growth: '+7.8%' },
  ];
  
  // Recent transactions
  const transactions = [
    { id: 1, date: 'Jun 28, 2025', description: 'Online Subscription', category: 'Operations', amount: '$1,200', status: 'Completed' },
    { id: 2, date: 'Jun 27, 2025', description: 'Google Ads Campaign', category: 'Marketing', amount: '$5,500', status: 'Completed' },
    { id: 3, date: 'Jun 26, 2025', description: 'Employee Salaries', category: 'Salaries', amount: '$32,500', status: 'Completed' },
    { id: 4, date: 'Jun 25, 2025', description: 'Office Equipment', category: 'Equipment', amount: '$3,200', status: 'Pending' },
    { id: 5, date: 'Jun 24, 2025', description: 'Consulting Fees', category: 'Others', amount: '$1,800', status: 'Completed' },
  ];

  // Find max value for chart scaling
  const maxValue = Math.max(...revenueData, ...expenseData);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-5 flex items-center justify-between border-b border-gray-700">
          <div className={`flex items-center ${sidebarOpen ? '' : 'hidden'}`}>
            <div className="bg-indigo-500 rounded-lg w-8 h-8 flex items-center justify-center mr-3">
              <span className="font-bold">A</span>
            </div>
            <h1 className="text-xl font-bold">Analytica</h1>
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            {sidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
        
        <nav className="mt-5">
          <ul>
            <NavItem 
              icon="dashboard" 
              label="Dashboard" 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')}
              sidebarOpen={sidebarOpen}
            />
            <NavItem 
              icon="analytics" 
              label="Analytics" 
              active={activeTab === 'analytics'} 
              onClick={() => setActiveTab('analytics')}
              sidebarOpen={sidebarOpen}
            />
            <NavItem 
              icon="reports" 
              label="Reports" 
              active={activeTab === 'reports'} 
              onClick={() => setActiveTab('reports')}
              sidebarOpen={sidebarOpen}
            />
            <NavItem 
              icon="transactions" 
              label="Transactions" 
              active={activeTab === 'transactions'} 
              onClick={() => setActiveTab('transactions')}
              sidebarOpen={sidebarOpen}
            />
            <NavItem 
              icon="settings" 
              label="Settings" 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')}
              sidebarOpen={sidebarOpen}
            />
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 ">
          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
            <div className={`ml-3 ${sidebarOpen ? '' : 'hidden'}`}>
              <p className="text-sm font-medium">Sarah Johnson</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden">
        {/* Top bar */}
        <div className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, Sarah! Here's your financial overview.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
              <span className="ml-2 text-gray-700 font-medium">Sarah</span>
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <MetricCard 
              title="Total Revenue" 
              value="$128,459" 
              change="+12.5% vs last month" 
              positive={true}
            />
            <MetricCard 
              title="Total Expenses" 
              value="$64,232" 
              change="+8.2% vs last month" 
            />
            <MetricCard 
              title="This Month" 
              value="~"
              change="vs Previous Period" 
              empty={true}
            />
            <MetricCard 
              title="Net Profit" 
              value="$64,227" 
              change="+16.8% vs last month" 
              positive={true}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 h-90 mb-8 ">
            {/* Expense Breakdown */}
            <div className="bg-white p-6 rounded-xl shadow-sm h-105  ">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Expense Breakdown</h2>
                <div className="flex">
                  <button className="text-gray-500 hover:text-gray-700 p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 p-1 ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center">
                <div className="relative w-48 h-48 mb-6">
                  {/* Donut Chart */}
                  <div className="absolute inset-0 rounded-full border-[16px] border-pink-500 transform -rotate-[72deg]"></div>
                  <div className="absolute inset-0 rounded-full border-[16px] border-amber-500 transform -rotate-[144deg]"></div>
                  <div className="absolute inset-0 rounded-full border-[16px] border-emerald-500 transform -rotate-[216deg]"></div>
                  <div className="absolute inset-0 rounded-full border-[16px] border-violet-500 transform -rotate-[288deg]"></div>
                  
                  {/* Center */}
                  <div className="absolute inset-8 bg-white rounded-full"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold">$64,232</p>
                      <p className="text-sm text-gray-500">Total Expenses</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 pl-0 md:pl-8">
                  {expenses.map((expense, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700">{expense.name}</span>
                        <span className="font-medium">{expense.amount}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${expense.color}`} 
                          style={{ width: `${expense.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 ">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Detailed Metrics</h2>
              <p className="text-gray-500 text-sm mt-1">Monthly financial performance metrics</p>
            </div>
            <div className="h-110 overflow-scroll ">
              <table className="min-w-full  divide-gray-200  ">
                <thead className="">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expenses
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Profit
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Growth
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y  divide-gray-200 ">
                  {metrics.map((metric, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {metric.period}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-medium">
                        {metric.revenue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        {metric.expenses}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 font-medium">
                        {metric.profit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-green-500 font-medium">
                        {metric.growth}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>

          {/* Detailed Metrics Section */}
        </div>
      </div>
    </div>
  );
};

// Reusable components
const NavItem = ({ icon, label, active, onClick, sidebarOpen }) => {
  const getIcon = () => {
    switch(icon) {
      case 'dashboard':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'analytics':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'reports':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'transactions':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'settings':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center w-full p-4 text-left hover:bg-gray-700 transition-colors rounded-md ${
          active ? 'bg-gray-700' : ''
        }`}
      >
        <span className="text-gray-400">{getIcon()}</span>
        <span className={`ml-3 ${sidebarOpen ? '' : 'hidden'}`}>{label}</span>
      </button>
    </li>
  );
};

const MetricCard = ({ title, value, change, positive, empty }) => (
  <div className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${positive ? 'border-green-500' : empty ? 'border-gray-300' : 'border-blue-500'}`}>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className={`text-2xl font-bold my-2 ${empty ? 'text-gray-400' : 'text-gray-800'}`}>
      {value}
    </p>
    <p className={`text-sm ${positive ? 'text-green-500' : 'text-gray-500'}`}>
      {change}
    </p>
  </div>
);

const ChartLegend = ({ color, label }) => (
  <div className="flex items-center">
    <div className={`w-4 h-4 rounded-sm ${color}`}></div>
    <span className="text-sm ml-2 text-gray-600">{label}</span>
  </div>
);

const MetricRow = ({ title, value, change, positive }) => (
  <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
    <div>
      <h3 className="font-medium text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">Last month: {change}</p>
    </div>
    <div className="text-right">
      <p className="font-semibold text-xl">{value}</p>
      <p className={`text-sm ${positive ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </p>
    </div>
  </div>
);

export default FinancialDashboard;