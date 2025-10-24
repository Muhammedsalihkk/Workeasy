import React, { useState, useEffect } from 'react';
import { FaClock, FaCalendarAlt, FaSearch, FaUserCheck, FaUserTimes, FaUserClock, FaUserSlash, FaFilter, FaFileExport, FaChevronDown, FaMapMarkerAlt } from 'react-icons/fa';
import FaceScanner from './FaceScanning';

const AttendanceTracker = () => {
    const [activeTab, setActiveTab] = useState('daily');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showFilters, setShowFilters] = useState(false);
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [checkInDropdown, setCheckInDropdown] = useState(false);
    const [checkOutDropdown, setCheckOutDropdown] = useState(false);
    const [userStatus, setUserStatus] = useState('notCheckedIn');
    const [userCheckInTime, setUserCheckInTime] = useState(null);
    const [userCheckOutTime, setUserCheckOutTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update current time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Sample attendance data
    const attendanceData = [
        {
            id: 1,
            name: 'Alex Morgan',
            role: 'Producer',
            department: 'Production',
            status: 'present',
            checkIn: '08:45 AM',
            checkOut: '06:15 PM',
            location: 'Studio A',
            hours: 8.5,
            date: '2025-06-03'
        },
        {
            id: 1,
            name: 'Alex Morgan',
            role: 'Producer',
            department: 'Production',
            status: 'present',
            checkIn: '08:30 AM',
            checkOut: '06:00 PM',
            location: 'Studio A',
            hours: 8.0,
            date: '2025-06-04'
        },
        {
            id: 1,
            name: 'Alex Morgan',
            role: 'Producer',
            department: 'Production',
            status: 'absent',
            checkIn: '--',
            checkOut: '--',
            location: '--',
            hours: 0,
            date: '2025-06-05'
        },
        {
            id: 1,
            name: 'Alex Morgan',
            role: 'Producer',
            department: 'Production',
            status: 'present',
            checkIn: '09:00 AM',
            checkOut: '06:30 PM',
            location: 'Studio A',
            hours: 8.5,
            date: '2025-06-06'
        }
    ];

    // Filter data based on selected filters
    const filteredData = attendanceData.filter(employee => {
        const departmentMatch = departmentFilter === 'all' || employee.department === departmentFilter;
        const statusMatch = statusFilter === 'all' || employee.status === statusFilter;
        return departmentMatch && statusMatch;
    });

    // Statistics
    const presentCount = attendanceData.filter(e => e.status === 'present').length;
    const lateCount = attendanceData.filter(e => e.status === 'late').length;
    const absentCount = attendanceData.filter(e => e.status === 'absent').length;
    const otherCount = attendanceData.length - presentCount - lateCount - absentCount;
    const [showScanner, setShowScanner] = useState(false);
    // Format date for display
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    // Format time for display
    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    // Status badge component
    const StatusBadge = ({ status }) => {
        const statusConfig = {
            present: { text: 'Present', color: 'bg-green-100 text-green-800' },
            late: { text: 'Late', color: 'bg-yellow-100 text-yellow-800' },
            absent: { text: 'Absent', color: 'bg-red-100 text-red-800' },
            onLeave: { text: 'On Leave', color: 'bg-blue-100 text-blue-800' },
            remote: { text: 'Remote', color: 'bg-purple-100 text-purple-800' },
        };

        const config = statusConfig[status] || { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.text}
            </span>
        );
    };

    // Handle check-in
    const handleCheckIn = () => {
        setUserCheckInTime(new Date());
        setShowScanner(!showScanner)
        setCheckInDropdown(false);
    };

    // Handle check-out
    const handleCheckOut = () => {
        setUserCheckOutTime(new Date());
        setUserStatus('checkedOut');
        setCheckOutDropdown(false);
    };

    // Reset attendance
    const handleReset = () => {
        setUserStatus('notCheckedIn');
        setUserCheckInTime(null);
        setUserCheckOutTime(null);
    };

    return (
        <div className="bg-gradient-to-br w-full from-gray-50 to-gray-100 p-4 md:p-8 h-10">
            <div className="max-w-full mx-auto ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
                        <div className="p-3 bg-green-100 rounded-lg mr-4">
                            <FaUserCheck className="text-green-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Present</p>
                            <p className="text-2xl font-bold text-gray-800">{presentCount}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                            <FaUserClock className="text-yellow-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Late Arrivals</p>
                            <p className="text-2xl font-bold text-gray-800">{lateCount}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
                        <div className="p-3 bg-red-100 rounded-lg mr-4">
                            <FaUserTimes className="text-red-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Absent</p>
                            <p className="text-2xl font-bold text-gray-800">{absentCount}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
                        <div className="p-3 bg-blue-100 rounded-lg mr-4">
                            <FaUserSlash className="text-blue-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Other Status</p>
                            <p className="text-2xl font-bold text-gray-800">{otherCount}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl shadow-lg mb-8 p-6 text-white">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <div className="bg-indigo-500 p-3 rounded-xl mr-4">
                                <FaClock className="text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Attendance Tracker</h2>
                                <p className="text-indigo-200">{formatDate(currentTime)}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold">{formatTime(currentTime)}</div>
                                <div className="text-indigo-200 text-sm">Current Time</div>
                            </div>

                            <div className="relative">
                                <button
                                    className={`px-6 py-3 rounded-lg flex items-center ${userStatus === 'checkedIn'
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : userStatus === 'checkedOut'
                                                ? 'bg-gray-600 hover:bg-gray-700'
                                                : 'bg-white text-indigo-700 hover:bg-gray-100'
                                        }`}
                                    onClick={() => setCheckInDropdown(!checkInDropdown)}
                                    disabled={userStatus === 'checkedIn' || userStatus === 'checkedOut'}
                                >
                                    {userStatus === 'checkedIn' ? (
                                        <>
                                            <FaUserCheck className="mr-2" /> Checked In at {userCheckInTime ? formatTime(userCheckInTime) : ''}
                                        </>
                                    ) : userStatus === 'checkedOut' ? (
                                        <>
                                            <FaUserTimes className="mr-2" /> Checked Out
                                        </>
                                    ) : (
                                        <>
                                            <FaUserCheck className="mr-2" /> Check In
                                        </>
                                    )}
                                    <FaChevronDown className="ml-2 text-sm" />
                                </button>

                                {checkInDropdown && (
                                    <div className="absolute z-10 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden">
                                        <div className="p-4 border-b">
                                            <h3 className="font-bold text-gray-800">Check In</h3>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <FaClock className="mr-2" />
                                                <span>Current Time: {formatTime(currentTime)}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 mb-4">
                                                <FaMapMarkerAlt className="mr-2" />
                                                <span>Location: Studio A</span>
                                            </div>
                                            <button
                                                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                                                onClick={handleCheckIn}
                                            >
                                                Check In Now
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {showScanner && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-40">
                                    <div className="bg-white p-6 rounded-lg shadow-lg">
                                        <FaceScanner/>
                                        <button
                                            onClick={() => setShowScanner(false)}
                                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="relative">
                                <button
                                    className={`px-6 py-3 rounded-lg flex items-center ${userStatus === 'checkedOut'
                                            ? 'bg-blue-600 hover:bg-blue-700'
                                            : userStatus === 'checkedIn'
                                                ? 'bg-white text-indigo-700 hover:bg-gray-100'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    onClick={() => setCheckOutDropdown(!checkOutDropdown)}
                                    disabled={userStatus !== 'checkedIn'}
                                >
                                    {userStatus === 'checkedOut' ? (
                                        <>
                                            <FaUserTimes className="mr-2" /> Checked Out at {userCheckOutTime ? formatTime(userCheckOutTime) : ''}
                                        </>
                                    ) : (
                                        <>
                                            <FaUserTimes className="mr-2" /> Check Out
                                        </>
                                    )}
                                    <FaChevronDown className="ml-2 text-sm" />
                                </button>

                                {checkOutDropdown && (
                                    <div className="absolute z-10 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden">
                                        <div className="p-4 border-b">
                                            <h3 className="font-bold text-gray-800">Check Out</h3>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <FaClock className="mr-2" />
                                                <span>Current Time: {formatTime(currentTime)}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <FaClock className="mr-2" />
                                                <span>Check-in Time: {userCheckInTime ? formatTime(userCheckInTime) : ''}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 mb-4">
                                                <FaMapMarkerAlt className="mr-2" />
                                                <span>Location: Studio A</span>
                                            </div>
                                            <button
                                                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition mb-2"
                                                onClick={handleCheckOut}
                                            >
                                                Check Out Now
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {userStatus !== 'notCheckedIn' && (
                                <button
                                    className="px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
                                    onClick={handleReset}
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                {/* Controls */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex space-x-2 mb-4 md:mb-0">
                            <button
                                className={`px-4 py-2 rounded-lg ${activeTab === 'daily' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                onClick={() => setActiveTab('daily')}
                            >
                                Daily View
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg ${activeTab === 'weekly' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                onClick={() => setActiveTab('weekly')}
                            >
                                Weekly View
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg ${activeTab === 'monthly' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                onClick={() => setActiveTab('monthly')}
                            >
                                Monthly Report
                            </button>
                        </div>

                        <div className="flex space-x-3 w-full md:w-auto">
                            <div className="relative flex-1 md:flex-none">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaSearch className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search crew members..."
                                    className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>

                            <button
                                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 flex items-center"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <FaFilter className="mr-2" />
                                Filters
                            </button>

                            <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 flex items-center">
                                <FaFileExport className="mr-2" />
                                Export
                            </button>
                        </div>
                    </div>

                    {/* Filter Panel */}
                    {showFilters && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                    <select
                                        className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={departmentFilter}
                                        onChange={(e) => setDepartmentFilter(e.target.value)}
                                    >
                                        <option value="all">All Departments</option>
                                        <option value="Production">Production</option>
                                        <option value="Creative">Creative</option>
                                        <option value="Camera">Camera</option>
                                        <option value="Audio">Audio</option>
                                        <option value="Lighting">Lighting</option>
                                        <option value="Art">Art</option>
                                        <option value="Post-Production">Post-Production</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="all">All Statuses</option>
                                        <option value="present">Present</option>
                                        <option value="late">Late</option>
                                        <option value="absent">Absent</option>
                                        <option value="onLeave">On Leave</option>
                                        <option value="remote">Remote</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Production</label>
                                    <select className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                        <option>All Productions</option>
                                        <option>Midnight Horizon</option>
                                        <option>Urban Legends</option>
                                        <option>Cosmic Voyage</option>
                                        <option>Summer Dreams</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Attendance Table */}
                <div className="bg-white rounded-xl shadow-md overflow-scroll h-77">

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Working Hours</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {attendanceData.map((entry) => (
                                    <tr key={entry.date} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.checkIn}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.checkOut}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{entry.hours > 0 ? `${entry.hours} hrs` : '--'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={entry.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    {/* Table Footer */}
                    <div className="bg-gray-50 px-6 py-3 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-sm text-gray-700 mb-4 md:mb-0">
                            Showing <span className="font-medium">{filteredData.length}</span> of <span className="font-medium">{attendanceData.length}</span> records
                        </div>
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700">Previous</button>
                            <button className="px-4 py-2 rounded-lg bg-gray-800 text-white">1</button>
                            <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700">Next</button>
                        </div>
                    </div>
                </div>

                {/* Stats Summary */}

            </div>
        </div>
    );
};

export default AttendanceTracker;