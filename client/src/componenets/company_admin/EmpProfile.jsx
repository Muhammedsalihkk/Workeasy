import React, { useState } from 'react';
import { FiCalendar, FiClock, FiLogIn, FiLogOut } from 'react-icons/fi';

const EmployeeProfile = ({ message }) => {
    const [activeTab, setActiveTab] = useState('personal');
    const { setViewEmployee, viewEmployee } = message

    // Employee data
    const employee = {
        name: "Sarah Johnson",
        employeeId: "EMP-2024-001",
        department: "Design",
        designation: "Senior Product Designer",
        shiftTime: "9:00 AM - 6:00 PM",
        qualification: "BCA",
        dob: "March 15, 1990",
        phone: "+1 (555) 123-4567",
        address: "123 Business Street, Suite 100, San Francisco, CA 94107",
        gender: "Female",
        Salary: 234567,
        email: "sarah.johnson@company.com",
        daysWorked: 22,
        totalHours: 176,
        lastClockIn: "9:00 AM",
        lastClockOut: "6:00 PM",
        profilePhoto: null
    };
    const attendanceData = [
        { date: "2023-10-05", day: "Thursday", clockIn: "08:15 AM", clockOut: "05:30 PM", totalHours: 8.25, status: "Present" },
        { date: "2023-10-04", day: "Wednesday", clockIn: "08:30 AM", clockOut: "05:45 PM", totalHours: 8.25, status: "Present" },
        { date: "2023-10-03", day: "Tuesday", clockIn: "08:10 AM", clockOut: "05:20 PM", totalHours: 8.17, status: "Present" },
        { date: "2023-10-02", day: "Monday", clockIn: "08:45 AM", clockOut: "05:30 PM", totalHours: 7.75, status: "Late Arrival" },
        { date: "2023-09-29", day: "Friday", clockIn: "08:05 AM", clockOut: "04:55 PM", totalHours: 7.83, status: "Early Departure" },
        { date: "2023-09-28", day: "Thursday", clockIn: "08:20 AM", clockOut: "05:35 PM", totalHours: 8.25, status: "Present" },
        { date: "2023-09-27", day: "Wednesday", clockIn: "08:15 AM", clockOut: "05:30 PM", totalHours: 8.25, status: "Present" },
        { date: "2023-09-26", day: "Tuesday", clockIn: "08:10 AM", clockOut: "05:25 PM", totalHours: 8.25, status: "Present" },
        { date: "2023-09-25", day: "Monday", clockIn: "08:25 AM", clockOut: "05:40 PM", totalHours: 8.25, status: "Present" },
    ];
    const today = attendanceData[0];
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
        <div
            className={`fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50 transition-all duration-500 ease-in-out ${viewEmployee ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-10 pointer-events-none'
                }`}
        >
            <div className="max-w-4xl  mx-auto bg-white rounded-xl h-170  overflow-hidden shadow-md ">
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white  ">
                    <div className='flex justify-end'>
                        <button
                            onClick={() => setViewEmployee(false)}
                            type="button" class="md:w-auto px-4 py-2 text-4xl   text-white font-medium rounded-md shadow-sm transition duration-200">
                            &times;</button>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-6 ">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                            <div className="w-20 h-20 rounded-full overflow-hidden">
                                <img
                                    src="https://thumbs.dreamstime.com/b/profile-picture-caucasian-male-employee-posing-office-happy-young-worker-look-camera-workplace-headshot-portrait-smiling-190186649.jpg"
                                    className="w-full h-full object-cover"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="text-center sm:text-left">
                            <h1 className="text-3xl font-bold">{employee.name}</h1>
                            <div className="mt-2 flex flex-wrap gap-4 justify-center sm:justify-start">
                                <div>
                                    <p className="text-sm opacity-80">Employee ID</p>
                                    <p className="font-semibold">{employee.employeeId}</p>
                                </div>
                                <div>
                                    <p className="text-sm opacity-80">Department</p>
                                    <p className="font-semibold">{employee.department}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Designation and Shift */}
                <div className="p-6 bg-gray-50 border-b ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Designation</p>
                            <p className="font-semibold">{employee.designation}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Shift Time</p>
                            <p className="font-semibold">{employee.shiftTime}</p>
                        </div>
                    </div>
                </div>
                {/* Stats Section */}
                <div className="max-w-4xl mx-auto mt-6 flex justify-evenly">
                    <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center space-x-4">
                        <FiCalendar className="text-indigo-600 text-3xl" />
                        <div>
                            <p className="text-sm text-gray-500">Total Days Worked</p>
                            <p className="text-2xl font-bold text-indigo-600">{employee.daysWorked}</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center space-x-4">
                        <FiClock className="text-green-600 text-3xl" />
                        <div>
                            <p className="text-sm text-gray-500">Total Hours</p>
                            <p className="text-2xl font-bold text-green-600">{employee.totalHours}</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center space-x-4">
                        <FiLogIn className="text-green-600 text-xl" />
                        <div>
                            <p className="text-sm text-gray-500">Last Clock In</p>
                            <p className="text-green-600 text-2xl font-semibold">{employee.lastClockIn}</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border flex items-center space-x-4">
                        <FiLogOut className="text-red-600 text-xl" />
                        <div>
                            <p className="text-sm text-gray-500">Last Clock Out</p>
                            <p className="text-red-600 text-2xl font-semibold">{employee.lastClockOut}</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b">
                    <button
                        className={`py-4 px-6 font-medium text-sm ${activeTab === 'personal' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('personal')}
                    >
                        Personal Information
                    </button>
                    <button
                        className={`py-4 px-6 font-medium text-sm ${activeTab === 'attendance' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('attendance')}
                    >
                        Attendance
                    </button>

                </div>

                {/* Tab Content */}
                <div className="p-6 ">
                    {activeTab === 'personal' && (
                        <div className=" grid grid-cols-2 ">
                            <div className="grid grid-cols-2 md:grid-cols-3gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Date of Birth</h3>
                                        <p className="font-semibold">{employee.dob}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h3>
                                        <p className="font-semibold">{employee.phone}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                                        <p className="font-semibold">{employee.email}</p>
                                    </div>
                                </div>

                            </div>
                            <div className="grid grid-cols-2   ">
                                <div className=" space-y-3 ">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Gender</h3>
                                        <p className="font-semibold">{employee.gender}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Base Salary</h3>
                                        <p className="font-semibold"><span>&#8377;</span> {employee.Salary}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Qualification</h3>
                                        <p className="font-semibold">{employee.qualification}</p>
                                    </div>

                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
                                    <p className="font-semibold">{employee.address}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'attendance' && (
                        <div className=' overflow-scroll h-100 space-x-11 '>

                            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 ">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-900">Today's Attendance</h2>
                                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                                        {today.status}
                                    </span>
                                </div>

                                <div className="grid bg-gray- grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="border bg-gray-100 border-gray-200 rounded-lg p-4">
                                        <p className="text-sm text-gray-500">Date</p>
                                        <p className="text-lg font-medium text-gray-900">{formatDate(today.date)}</p>
                                        <p className="text-sm text-gray-500 mt-1">{today.day}</p>
                                    </div>

                                    <div className="border bg-gray-100 border-gray-200 rounded-lg p-4 h-32">
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-sm text-gray-500">Clock In</p>
                                                <p className="text-lg font-medium text-gray-900">{today.clockIn}</p>
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm text-gray-500">Clock Out</p>
                                                <p className="text-lg font-medium text-gray-900">{today.clockOut}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 ">
                                                <div
                                                    className="bg-green-600 h-2.5 rounded-full"
                                                    style={{ width: `${(today.totalHours / 8.5) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm text-gray-500 ml-2">{today.totalHours} hrs</span>                                        </div>
                                    </div>

                                    <div className="border bg-gray-100  border-gray-200 rounded-lg p-4">
                                        <p className="text-sm text-gray-500">Status Details</p>
                                        <p className="text-gray-700 mt-2">
                                            {today.status === "Present"
                                                ? "Full attendance with no issues"
                                                : "Attendance with noted exceptions"}
                                        </p>
                                        {today.status !== "Present" && (
                                            <p className="text-sm text-yellow-600 mt-2">
                                                <span className="font-medium">Note:</span>{" "}
                                                {today.status === "Late Arrival"
                                                    ? "Arrived 15 minutes after scheduled start time"
                                                    : "Left 25 minutes before scheduled end time"}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Attendance History */}
                            <div className="bg-white rounded-xl shadow-md h-screen  overflow-scroll ">
                                <div className="border-b border-gray-200">
                                    <div className="flex justify-between items-center px-6 py-4">
                                        <h2 className="text-xl font-bold text-gray-900">Attendance History</h2>
                                    </div>
                                </div>

                                {/* Attendance Table */}
                                <div className="overflow-scroll">
                                    <table className="min-w-full divide-y overflow-scroll divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock In</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock Out</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {attendanceData.map((record, index) => (
                                                <tr key={index} className={index === 0 ? "bg-indigo-50" : "hover:bg-gray-50"}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{formatDate(record.date)}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{record.day}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{record.clockIn}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{record.clockOut}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{record.totalHours} hours</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.status === "Present"
                                                            ? "bg-green-100 text-green-800"
                                                            : record.status === "Late Arrival"
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "bg-orange-100 text-orange-800"
                                                            }`}>
                                                            {record.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    )}


                </div>

            </div>


        </div>
    );
};

export default EmployeeProfile;