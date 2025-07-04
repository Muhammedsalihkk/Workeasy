import React, { useState, useRef, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
    FiActivity,
    FiUsers,
    FiShoppingCart,
    FiDollarSign,
    FiTrendingUp,
    FiMenu,
    FiSearch,
    FiBell,
    FiSettings,
    FiPieChart,
    FiBarChart2,
    FiCreditCard,
    FiChevronDown,
    FiTrendingDown
} from 'react-icons/fi';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

import { ChartBarBigIcon, ChartBarIcon } from 'lucide-react';
import Header from '../Header';
import { getall_employee } from '../../Redux/Slice/Employee/AllEmployees';
import { useDispatch } from 'react-redux';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const AnalyticsDashboard = ({message}) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [timeRange, setTimeRange] = useState('monthly');
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const notificationsRef = useRef(null);
    const userMenuRef = useRef(null);
    const dispatch=useDispatch()
    const {user}=message
 


    const header = <div className='flex gap-2.5'>
        <ChartBarIcon className="w-7 h-7 text-gray-700" />
        <h2 className="text-xl font-bold text-gray-800">Anlysi</h2></div>
    // Mock data
    const metrics = [
        { title: 'Total Revenue', value: '$42,567', change: '+12.5%', icon: <FiDollarSign className="text-2xl" />, color: 'bg-gradient-to-r from-blue-500 to-indigo-600' },
        { title: 'Active Users', value: '8,492', change: '+8.3%', icon: <FiUsers className="text-2xl" />, color: 'bg-gradient-to-r from-green-500 to-emerald-600' },
        { title: 'New Orders', value: '1,284', change: '-2.1%', icon: <FiShoppingCart className="text-2xl" />, color: 'bg-gradient-to-r from-amber-500 to-orange-500' },
        { title: 'Conversion Rate', value: '4.8%', change: '+1.2%', icon: <FiTrendingUp className="text-2xl" />, color: 'bg-gradient-to-r from-purple-500 to-fuchsia-600' }
    ];

    const topProducts = [
        { name: 'Premium Headphones', sales: 342, revenue: '$12,467', change: '+15%' },
        { name: 'Smart Watch Pro', sales: 276, revenue: '$9,843', change: '+8%' },
        { name: 'Wireless Earbuds', sales: 198, revenue: '$6,732', change: '-3%' },
        { name: 'Fitness Tracker', sales: 154, revenue: '$4,987', change: '+22%' },
        { name: 'Bluetooth Speaker', sales: 132, revenue: '$3,984', change: '+5%' }
    ];

    const recentActivities = [
        { user: 'Alex Morgan', action: 'placed new order', time: '2 min ago', iconColor: 'bg-blue-500' },
        { user: 'Taylor Swift', action: 'completed payment', time: '24 min ago', iconColor: 'bg-green-500' },
        { user: 'John Doe', action: 'created new account', time: '1 hour ago', iconColor: 'bg-amber-500' },
        { user: 'Sarah Connor', action: 'requested refund', time: '3 hours ago', iconColor: 'bg-rose-500' },
        { user: 'Michael Jordan', action: 'submitted review', time: '5 hours ago', iconColor: 'bg-purple-500' }
    ];

    const notifications = [
        { id: 1, title: 'New order received', description: 'Order #ORD-2874 has been placed', time: '5 min ago', read: false },
        { id: 2, title: 'Server alert', description: 'CPU usage is above 85%', time: '1 hour ago', read: true },
        { id: 3, title: 'Payment received', description: '$1,284.00 from John Smith', time: '3 hours ago', read: true },
    ];

    // Revenue Chart Data
    const getRevenueData = () => {
        let labels, dataValues;

        switch (timeRange) {
            case 'daily':
                labels = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];
                dataValues = [3500, 5200, 7800, 8100, 10500, 8900];
                break;
            case 'weekly':
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                dataValues = [10500, 12000, 13500, 14200, 15600, 17800, 19200];
                break;
            case 'monthly':
                labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                dataValues = [28500, 34500, 39800, 42500];
                break;
            case 'yearly':
                labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                dataValues = [28500, 31200, 34500, 36500, 39800, 41200, 43600, 45800, 47200, 48900, 50200, 54200];
                break;
            default:
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                dataValues = [10500, 12000, 13500, 14200, 15600, 17800, 19200];
        }

        return {
            labels,
            datasets: [
                {
                    label: 'Revenue',
                    data: dataValues,
                    borderColor: 'rgb(99, 102, 241)',
                    backgroundColor: (context) => {
                        const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
                        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
                        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
                        return gradient;
                    },
                    pointBackgroundColor: 'rgb(79, 70, 229)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(79, 70, 229)',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.3,
                    fill: true,
                }
            ]
        };
    };

    // Revenue Chart Options
    const revenueOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: { size: 14, weight: 'normal' },
                bodyFont: { size: 13 },
                callbacks: {
                    label: (context) => `$${context.parsed.y.toLocaleString()}`
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#6B7280' }
            },
            y: {
                grid: { color: 'rgba(0, 0, 0, 0.05)' },
                ticks: {
                    color: '#6B7280',
                    callback: (value) => '$' + value.toLocaleString()
                }
            }
        },
        interaction: { intersect: false, mode: 'index' },
        animation: { duration: 2000, easing: 'easeOutQuart' }
    };

    // User Acquisition Data
    const userAcquisitionData = {
        labels: ['Direct', 'Social Media', 'Email', 'Search Engines', 'Referrals'],
        datasets: [
            {
                data: [35, 25, 15, 15, 10],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(52, 211, 153, 0.8)',
                    'rgba(251, 191, 36, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ],
                borderColor: [
                    'rgba(99, 102, 241, 1)',
                    'rgba(52, 211, 153, 1)',
                    'rgba(251, 191, 36, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(139, 92, 246, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    // User Acquisition Options
    const userAcquisitionOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#6B7280',
                    padding: 20,
                    font: { size: 12 },
                    generateLabels: (chart) => {
                        return chart.data.labels.map((label, i) => ({
                            text: `${label}: ${chart.data.datasets[0].data[i]}%`,
                            fillStyle: chart.data.datasets[0].backgroundColor[i],
                            strokeStyle: chart.data.datasets[0].borderColor[i],
                            lineWidth: 1,
                            hidden: false,
                            index: i
                        }));
                    }
                }
            },
            tooltip: {
                callbacks: { label: (context) => `${context.label}: ${context.parsed}%` }
            }
        },
        animation: { animateRotate: true, animateScale: true, duration: 2000 }
    };

    // Traffic Sources Data
    const trafficSourcesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [
            {
                label: 'Organic',
                data: [4500, 5200, 4800, 6100, 5800, 7200, 6900, 8100, 7800],
                backgroundColor: 'rgba(99, 102, 241, 0.8)',
                borderRadius: 6
            },
            {
                label: 'Paid',
                data: [3200, 3800, 4100, 3700, 4200, 5100, 4900, 5600, 6100],
                backgroundColor: 'rgba(251, 191, 36, 0.8)',
                borderRadius: 6
            },
            {
                label: 'Social',
                data: [2800, 3100, 3500, 3300, 3800, 4200, 4500, 4800, 5100],
                backgroundColor: 'rgba(52, 211, 153, 0.8)',
                borderRadius: 6
            }
        ],
    };

    // Traffic Sources Options
    const trafficSourcesOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#6B7280',
                    usePointStyle: true,
                    padding: 20,
                    font: { size: 12 }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleFont: { size: 14, weight: 'normal' },
                bodyFont: { size: 13 },
                callbacks: { label: (context) => `${context.dataset.label}: ${context.parsed.y.toLocaleString()} visitors` }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#6B7280' }
            },
            y: {
                grid: { color: 'rgba(0, 0, 0, 0.05)' },
                ticks: { color: '#6B7280', callback: (value) => value.toLocaleString() }
            }
        },
        animation: { duration: 2000, easing: 'easeOutQuart' }
    };

    // Sales Distribution Data
    const salesDistributionData = {
        labels: ['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Sports'],
        datasets: [
            {
                data: [35, 25, 20, 12, 8],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(52, 211, 153, 0.8)',
                    'rgba(251, 191, 36, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ],
                borderColor: [
                    'rgba(99, 102, 241, 1)',
                    'rgba(52, 211, 153, 1)',
                    'rgba(251, 191, 36, 1)',
                    'rgba(236, 72, 153, 1)',
                    'rgba(139, 92, 246, 1)'
                ],
                borderWidth: 1,
                cutout: '70%',
            }
        ]
    };

    // Sales Distribution Options
    const salesDistributionOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#6B7280',
                    padding: 20,
                    font: { size: 12 },
                    generateLabels: (chart) => {
                        return chart.data.labels.map((label, i) => ({
                            text: `${label}: ${chart.data.datasets[0].data[i]}%`,
                            fillStyle: chart.data.datasets[0].backgroundColor[i],
                            strokeStyle: chart.data.datasets[0].borderColor[i],
                            lineWidth: 1,
                            hidden: false,
                            index: i
                        }));
                    }
                }
            },
            tooltip: {
                callbacks: { label: (context) => `${context.label}: ${context.parsed}%` }
            }
        },
        animation: { animateRotate: true, animateScale: true, duration: 2000 }
    };

    // Close dropdowns when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setNotificationOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };

        
    }, []);
    const data=""

    return (
        data?( <div className="flex flex-col items-center w-full justify-center py-10 bg-white rounded-lg shadow-md border border-gray-200">
    <ChartBarIcon className="w-7 h-7 text-gray-700" />
    <p className="text-gray-500 text-lg font-medium">No data analysed yut</p>
    <p className="text-gray-400 text-sm mt-1">You're all caught up!</p>
  </div>):(<div className="flex h-screen overflow-scroll w-full bg-gray-50 font-sans">
            {/* Main Content */}
            <div className="flex-1 flex flex-col ">
                {/* Topbar */}
                <Header message={{header,user}} />
                {/* Time Range Filter */}
                <div className='mt-10'>
                       <div className="md:flex justify-center mb-5 gap-10">

                        {/* Income */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-transform hover:translate-y-[-3px] hover:shadow-md">
                            <div className="p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 text-sm">Income</p>
                                        <h3 className="text-2xl font-bold mt-1 text-gray-800">$54,320</h3>
                                        <span className="text-sm font-medium text-green-500">
                                            +10.5% from last {timeRange}
                                        </span>
                                    </div>
                                    <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow">
                                        <FiDollarSign className="text-2xl" />
                                    </div>
                                </div>
                            </div>
                            <div className="h-1 w-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
                        </div>

                        {/* Expenses */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-transform hover:translate-y-[-3px] hover:shadow-md">
                            <div className="p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 text-sm">Expenses</p>
                                        <h3 className="text-2xl font-bold mt-1 text-gray-800">$28,450</h3>
                                        <span className="text-sm font-medium text-red-500">
                                            +3.2% from last {timeRange}
                                        </span>
                                    </div>
                                    <div className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white shadow">
                                        <FiTrendingDown className="text-2xl" />
                                    </div>
                                </div>
                            </div>
                            <div className="h-1 w-full bg-gradient-to-r from-red-500 to-rose-600"></div>
                        </div>

                        {/* Profit Rating */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-transform hover:translate-y-[-3px] hover:shadow-md">
                            <div className="p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 text-sm">Profit Rating</p>
                                        <h3 className="text-2xl font-bold mt-1 text-gray-800">7.8%</h3>
                                        <span className="text-sm font-medium text-green-500">
                                            +1.5% from last {timeRange}
                                        </span>
                                    </div>
                                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white shadow">
                                        <FiTrendingUp className="text-2xl" />
                                    </div>
                                </div>
                            </div>
                            <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-fuchsia-600"></div>
                        </div>

                    </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 ">
                    <div className="flex items-center justify-between">

                        <div className="flex space-x-2">
                            {['daily', 'weekly', 'monthly', 'yearly'].map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setTimeRange(range)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${timeRange === range
                                        ? 'bg-blue-600 text-white shadow'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {range.charAt(0).toUpperCase() + range.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                    {/* Metrics Cards */}
                    {/* Charts Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* Revenue Chart */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-semibold text-gray-800">Revenue Overview</h3>

                            </div>
                            <div className="h-80">
                                <Line data={getRevenueData()} options={revenueOptions} />
                            </div>
                        </div>

                        {/* Top Products */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h3 className="font-semibold mb-6 text-gray-800">Top Selling Products</h3>
                            <div className="space-y-4">
                                {topProducts.map((product, index) => (
                                    <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-100">
                                        <div className="flex items-center">
                                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                                            <div>
                                                <p className="font-medium text-gray-800">{product.name}</p>
                                                <p className="text-sm text-gray-500">{product.sales} sold</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800 text-right">{product.revenue}</p>
                                            <span className={`text-xs font-medium ${product.change.includes('+')
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                                }`}>
                                                {product.change}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-3 text-center text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                    View All Products
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Second Row Charts */}
                    <div className="grid grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
                        {/* Sales Distribution */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-semibold text-gray-800">Sales Distribution</h3>
                                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View Details</button>
                            </div>
                            <div className="h-72">
                                <Pie data={salesDistributionData} options={salesDistributionOptions} />
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h3 className="font-semibold mb-6 text-gray-800">Recent Activity</h3>
                            <div className="space-y-4">
                                {recentActivities.map((activity, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="mr-4 mt-1">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center">
                                                <div className={`w-8 h-8 ${activity.iconColor} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                                                    {activity.user.charAt(0)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1 border-b border-gray-100 pb-4">
                                            <p className="font-medium text-gray-800">
                                                <span className="text-blue-600">{activity.user}</span> {activity.action}
                                            </p>
                                            <p className="text-sm text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-3 text-center text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                    View All Activity
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    </div>
                </main>
            </div>
        </div>)
    );
};

export default AnalyticsDashboard;