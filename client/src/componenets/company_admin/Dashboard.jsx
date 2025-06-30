// src/ProductionDashboard.js
import React, { useState } from 'react';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Statistic, Table, Tag, Card } from 'antd';
import { FiDollarSign, FiUsers, FiShoppingCart, FiTrendingUp } from 'react-icons/fi';
import { ArrowUpOutlined, ArrowDownOutlined, HomeFilled } from '@ant-design/icons';
import Header from './Header';
import { BellIcon, LayoutDashboard, LayoutDashboardIcon } from 'lucide-react';
import { HomeIcon } from '@heroicons/react/24/outline';

// Mock data for charts and tables
const revenueData = [

];
const metrics = [
   
];


const orderData = [
];
  const header=<div className='flex gap-2.5'>
   <LayoutDashboardIcon className="w-7 h-7 text-gray-700" />
          <h2 className="text-xl font-bold text-gray-800">DashBoard</h2></div>
const recentActivities = [
  
];

const columns = [
    {
        title: 'Activity',
        dataIndex: 'activity',
        key: 'activity',
    },
    {
        title: 'Project',
        dataIndex: 'project',
        key: 'project',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: status => (
            <Tag color={
                status === 'Completed' ? 'green' :
                    status === 'In Progress' ? 'blue' : 'orange'
            }>
                {status}
            </Tag>
        ),
    },
];

const ProductionDashboard = ({message}) => {
    const [timeRange, setTimeRange] = useState('monthly');
    const {activeItem, setActiveItem}=message
    return (
        <div className="min-h-screen bg-gray-50 w-full h-1 overflow-scroll">
            {/* Header */}

            <Header message={header} />
            {/* Main Content */}
            <main className="p-6 max-w-7xl mx-auto">
                {/* Metrics Cards */}
                <div className="md:flex justify-center mb-5 gap-10">
                    {/* Total Revenue */}
                    {metrics.length == 0 ? (<div onClick={()=>setActiveItem("Analytics")} className="col-span-full flex justify-center items-center py-10">
                        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-md shadow-md transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add your analytics here
                        </button>
                    </div>) : (<div onClick={()=>setActiveItem("Analytics")} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-transform hover:translate-y-[-3px] hover:shadow-md">
                        <div className="p-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-sm">Total Revenue</p>
                                    <h3 className="text-2xl font-bold mt-1 text-gray-800">$42,567</h3>
                                    <span className="text-sm font-medium text-green-500">
                                        +12.5% from last {timeRange}
                                    </span>
                                </div>
                                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow">
                                    <FiDollarSign className="text-2xl" />
                                </div>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                    </div>)}

                    {/* Active Users */}
                  {metrics.length==0?(<div  onClick={()=>setActiveItem("Employees")}  className="col-span-full flex justify-center items-center py-10">
                        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-md shadow-md transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add your Employees here
                        </button>
                    </div>):(  <div  onClick={()=>setActiveItem("Employees")}  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-transform hover:translate-y-[-3px] hover:shadow-md">
                        <div className="p-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-sm">Active Employees</p>
                                    <h3 className="text-2xl font-bold mt-1 text-gray-800">8,492</h3>
                                    <span className="text-sm font-medium text-green-500">
                                        +8.3% from last {timeRange}
                                    </span>
                                </div>
                                <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow">
                                    <FiUsers className="text-2xl" />
                                </div>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
                    </div>)}

                    {/* New Orders */}
                   {metrics.length==0?(<div  onClick={()=>setActiveItem("Orders")}  className="col-span-full flex justify-center items-center py-10">
                        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-md shadow-md transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add your analytics here
                        </button>
                    </div>):( <div  onClick={()=>setActiveItem("Orders")}  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-transform hover:translate-y-[-3px] hover:shadow-md">
                        <div className="p-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-sm">New Orders</p>
                                    <h3 className="text-2xl font-bold mt-1 text-gray-800">1,284</h3>
                                    <span className="text-sm font-medium text-red-500">
                                        -2.1% from last {timeRange}
                                    </span>
                                </div>
                                <div className="p-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow">
                                    <FiShoppingCart className="text-2xl" />
                                </div>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
                    </div>)}

                    {/* Conversion Rate */}
                   {metrics.length==0?(<div  className="col-span-full flex justify-center items-center py-10">
                        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-md shadow-md transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add your analytics here
                        </button>
                    </div>):( <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-transform hover:translate-y-[-3px] hover:shadow-md">
                        <div className="p-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-sm">Conversion Rate</p>
                                    <h3 className="text-2xl font-bold mt-1 text-gray-800">4.8%</h3>
                                    <span className="text-sm font-medium text-green-500">
                                        +1.2% from last {timeRange}
                                    </span>
                                </div>
                                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow">
                                    <FiTrendingUp className="text-2xl" />
                                </div>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-fuchsia-600"></div>
                    </div>)}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Revenue Chart */}
                    <Card
                        title={<span className="font-bold text-lg text-gray-800">Revenue Trend</span>}
                        className="rounded-lg shadow-md border-0"
                    >
                        {revenueData.length == 0 ? (
                            <div className='flex justify-center h-80 items-center'><button className="flex items-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition">
                                {/* Revenue / Line Chart icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3v18h18M5 13l4-4 4 4 4-4 2 2"
                                    />
                                </svg>
                                See the Revenue Chart here
                            </button>
                            </div>) : <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="month" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '0.5rem'
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#3361ff"
                                        activeDot={{ r: 8 }}
                                        strokeWidth={2}
                                        name="Revenue ($)"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>}
                    </Card>

                    {/* Orders Chart */}
                    <Card
                        title={<span className="font-bold text-lg text-gray-800">Order Statistics</span>}
                        className="rounded-lg shadow-md border-0"
                    >
                        {orderData.length == 0 ? (<div className="flex items-center justify-center h-80">
                            <button className="flex items-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3v18h18M7 13h4v6H7v-6zm6-8h4v14h-4V5z"
                                    />
                                </svg>
                                See the Order Chart here
                            </button>
                        </div>) : <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={orderData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="day" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '0.5rem'
                                        }}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="value"
                                        fill="#3361ff"

                                        name="Orders"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>}
                    </Card>
                </div>

                {/* Recent Activities */}
                <Card
                    title={<span className="font-semibold text-gray-800">Recent Activities</span>}
                    className="rounded-lg shadow-md border-0"
                >
                    <Table
                        dataSource={recentActivities}
                        columns={columns}
                        pagination={false}
                        size="large"
                        className='text-2xl'
                    />
                </Card>
            </main>
        </div>
    );
};

export default ProductionDashboard;