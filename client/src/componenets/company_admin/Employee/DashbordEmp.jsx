// src/EmployeeDashboard.js

import React, { useState } from 'react';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
    BriefcaseIcon, ClockIcon, PlusCircleIcon, CalendarIcon, CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Header from '../Header';
import { LayoutDashboardIcon } from 'lucide-react';

const EmployeeDashboard = ({message}) => {

    // Employee data
    const [employee] = useState({
        name: "Michael Johnson",
        role: "Senior Camera Operator",
        department: "Production - Camera Department",
        avatar: "MJ",
    });
    const {user} = message

    // KPI data
    const kpis = [

        { title: 'Totel Working days', value: 20, icon: ClockIcon, color: 'bg-green-500' },
        { title: ' Late Days', value: 5, icon: PlusCircleIcon, color: 'bg-yellow-500' },
        { title: 'Leaves Taken', value: 10, icon: CalendarIcon, color: 'bg-red-500' },
    ];

    // Attendance summary data (Doughnut)
    const monthlySummary = [
        { name: 'Present', value: 18, color: '#10B981' },
        { name: 'Late', value: 2, color: '#FBBF24' },
        { name: 'Absent', value: 1, color: '#EF4444' },
        { name: 'Leave', value: 2, color: '#60A5FA' },
    ];

    // Salary data (last 6 months)
    const salaryData = [
        { month: 'Feb', salary: 5200 },
        { month: 'Mar', salary: 5300 },
        { month: 'Apr', salary: 5250 },
        { month: 'May', salary: 5400 },
        { month: 'Jun', salary: 5500 },
        { month: 'Jul', salary: 5600 },
    ];

    // Notifications data
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Schedule Change', message: 'Shooting for TechVision moved to Studio B tomorrow', time: '2 hours ago', read: false },
        { id: 2, title: 'Equipment Ready', message: 'Your requested camera rig is ready for pickup', time: '1 day ago', read: false },
        { id: 1, title: 'Schedule Change', message: 'Shooting for TechVision moved to Studio B tomorrow', time: '2 hours ago', read: false },
        { id: 2, title: 'Equipment Ready', message: 'Your requested camera rig is ready for pickup', time: '1 day ago', read: false },
    ]);

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, read: true }))
        );
    };

    const unreadCount = notifications.filter(n => !n.read).length;
    const header=<div className='flex gap-2.5'>
   <LayoutDashboardIcon className="w-7 h-7 text-gray-700" />
          <h2 className="text-xl font-bold text-gray-800">DashBoard</h2></div>

    return (
        <div className="   space-y-4  bg-gray-50">

            {/* Header */}
           <Header message={{header,user}}/>

            <main className="max-w-7xl mx-auto px-4 ">

                {/* KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {kpis.map((kpi, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md flex items-center space-x-4 p-4">
                            <div className={`${kpi.color} rounded-full p-2 text-white`}>
                                <kpi.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{kpi.title}</p>
                                <p className="text-lg font-bold">{kpi.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 h-1  lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-bold mb-4">Attendance Summary</h2>
                            <div className="h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={monthlySummary}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={120}
                                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                        >
                                            {monthlySummary.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>

                    <div className="space-y-5 ">

                       
                        <div className="bg-white rounded-xl  shadow-md  ">
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 overflow-scroll px-6 py-4 border-b flex justify-between items-center">
                                <h2 className="text-md font-bold text-gray-800">Notifications</h2>
                                {unreadCount > 0 && (
                                    <button onClick={markAllAsRead} className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded">
                                        Mark All as Read
                                    </button>
                                )}
                            </div>
                            <div className="p-2 max-h-[202px] overflow-y-auto">
                                {notifications.map(notification => (
                                    <div key={notification.id}
                                        className={`p-4 border-b cursor-pointer transition-colors ${!notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
                                            }`}
                                        onClick={() => markAsRead(notification.id)}
                                    >
                                        <h3 className="font-medium text-gray-900">{notification.title}</h3>
                                        <p className="text-sm text-gray-600">{notification.message}</p>
                                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="bg-white rounded-xl shadow-md p-4">
                            <h2 className="text-md font-bold text-gray-800 mb-2">Last 3 Months Salary</h2>
                            <div className="space-y-2">
                                {[
                                    { month: 'May', salary: 5400, status: 'Paid' },
                                    { month: 'June', salary: 5500, status: 'Paid' },
                                    { month: 'July', salary: 5600, status: 'Pending' }
                                ].map((item, index) => (
                                    <div key={index} className="flex justify-between items-center border-b pb-1">
                                        <div>
                                            <p className="text-sm font-medium">{item.month}</p>
                                            <p className="text-xs text-gray-500">${item.salary}</p>
                                        </div>
                                        <span className={`text-xs px-2 py-0.5 rounded-full
          ${item.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                                item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'}
        `}>
                                            {item.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>

                </div>
            </main>

        </div>
    );
};

export default EmployeeDashboard;
