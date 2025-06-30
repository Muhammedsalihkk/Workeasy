// src/EmployeeDetails.js
import React, { useState, useMemo } from 'react';
import { FaSearch, FaSort, FaUserPlus, FaFilter, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import EmployeeProfile from './EmpProfile';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import Header from './Header';
import EditProfile from './Edit.employee';

const EmployeeDetails = () => {
    // Sample employee data
    const header = <div className='flex gap-2.5'>
        <UserGroupIcon className="w-7 h-7 text-gray-700" />
        <h2 className="text-xl font-bold text-gray-800">Employee</h2></div>
    const employees = [
        { id: 1, name: 'Sarah Johnson', position: 'Frontend Developer', department: 'Engineering', email: 'sarah@techcorp.com', phone: '+1 (555) 123-4567', status: 'Active', joinDate: '2022-03-15' },
        { id: 2, name: 'Michael Chen', position: 'UX Designer', department: 'Design', email: 'michael@techcorp.com', phone: '+1 (555) 987-6543', status: 'Active', joinDate: '2021-11-20' },
        { id: 3, name: 'Emma Rodriguez', position: 'Product Manager', department: 'Product', email: 'emma@techcorp.com', phone: '+1 (555) 456-7890', status: 'Active', joinDate: '2020-05-10' },
        { id: 4, name: 'David Wilson', position: 'Backend Developer', department: 'Engineering', email: 'david@techcorp.com', phone: '+1 (555) 654-3210', status: 'On Leave', joinDate: '2023-01-05' },
        { id: 5, name: 'James Taylor', position: 'DevOps Engineer', department: 'Engineering', email: 'james@techcorp.com', phone: '+1 (555) 321-0987', status: 'Active', joinDate: '2022-08-22' },
        { id: 6, name: 'Lisa Brown', position: 'HR Specialist', department: 'Human Resources', email: 'lisa@techcorp.com', phone: '+1 (555) 789-0123', status: 'Active', joinDate: '2021-02-14' },
        { id: 7, name: 'Robert Garcia', position: 'Data Analyst', department: 'Analytics', email: 'robert@techcorp.com', phone: '+1 (555) 012-3456', status: 'Inactive', joinDate: '2019-07-30' },
        { id: 8, name: 'Jennifer Lee', position: 'Marketing Manager', department: 'Marketing', email: 'jennifer@techcorp.com', phone: '+1 (555) 234-5678', status: 'Active', joinDate: '2022-11-01' },
        { id: 9, name: 'Thomas Anderson', position: 'QA Engineer', department: 'Engineering', email: 'thomas@techcorp.com', phone: '+1 (555) 876-5432', status: 'Active', joinDate: '2023-03-10' },
        { id: 10, name: 'Olivia Parker', position: 'Sales Executive', department: 'Sales', email: 'olivia@techcorp.com', phone: '+1 (555) 345-6789', status: 'On Leave', joinDate: '2021-09-15' },
    ];

    // State for search and filters
    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [viewEmployee, setViewEmployee] = useState(false)
    const [editprofile,seteditprofile]=useState(false)

    // Get unique departments for filter dropdown
    const departments = useMemo(() => {
        const depts = [...new Set(employees.map(emp => emp.department))];
        return ['All', ...depts];
    }, []);

    // Get unique statuses for filter dropdown
    const statuses = useMemo(() => {
        const stats = [...new Set(employees.map(emp => emp.status))];
        return ['All', ...stats];
    }, []);

    // Handle sorting
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Filter and sort employees
    const filteredEmployees = useMemo(() => {
        let result = [...employees];

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(emp =>
                emp.name.toLowerCase().includes(term) ||
                emp.position.toLowerCase().includes(term) ||
                emp.department.toLowerCase().includes(term) ||
                emp.email.toLowerCase().includes(term)
            )
        }

        // Apply department filter
        if (departmentFilter !== 'All') {
            result = result.filter(emp => emp.department === departmentFilter);
        }

        // Apply status filter
        if (statusFilter !== 'All') {
            result = result.filter(emp => emp.status === statusFilter);
        }

        // Apply sorting
        if (sortConfig.key) {
            result.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        return result;
    }, [employees, searchTerm, departmentFilter, statusFilter, sortConfig]);

    // Status badge component
    const StatusBadge = ({ status }) => {
        let color = 'bg-gray-100 text-gray-800';
        if (status === 'Active') color = 'bg-green-100 text-green-800';
        if (status === 'On Leave') color = 'bg-yellow-100 text-yellow-800';
        if (status === 'Inactive') color = 'bg-red-100 text-red-800';

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
                {status}
            </span>
        );
    };
    const data=""
    return (

        !data?(<div onClick={()=>setActiveItem("Analytics")} className=" w-full flex justify-center items-center py-10">
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
                            Add your Employees
                        </button>
                    </div>):(
            <div className="min-h-screen h-1 overflow-scroll w-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className='flex justify-end mb-8'>
                        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <FaUserPlus className="text-sm" />
                            Add New Employee
                        </button>
                    </div>
                    {/* Filters and Search */}
                    <div className="bg-white rounded-xl shadow-md p-6 mb-8 ">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <FaSearch className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Search employees..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>


                            <div>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={departmentFilter}
                                    onChange={(e) => setDepartmentFilter(e.target.value)}
                                >
                                    {departments.map((dept, index) => (
                                        <option key={index} value={dept}>
                                            {dept === 'All' ? 'All Departments' : dept}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    {statuses.map((status, index) => (
                                        <option key={index} value={status}>
                                            {status === 'All' ? 'All Statuses' : status}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center justify-end">
                                <p className="text-gray-600 text-sm">
                                    Showing <span className="font-bold">{filteredEmployees.length}</span> of <span className="font-bold">{employees.length}</span> employees
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Employee Table */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-1 cursor-pointer" onClick={() => requestSort('id')}>
                                                ID
                                                <FaSort className="text-gray-400" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-1 cursor-pointer" onClick={() => requestSort('name')}>
                                                Employee
                                                <FaSort className="text-gray-400" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-1 cursor-pointer" onClick={() => requestSort('position')}>
                                                Position
                                                <FaSort className="text-gray-400" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-1 cursor-pointer" onClick={() => requestSort('department')}>
                                                Department
                                                <FaSort className="text-gray-400" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-1 cursor-pointer" onClick={() => requestSort('status')}>
                                                Status
                                                <FaSort className="text-gray-400" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredEmployees.length > 0 ? (
                                        filteredEmployees.map((employee) => (
                                            <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">#{employee.id}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                                                                {employee.name.charAt(0)}
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                                            <div className="text-sm text-gray-500">Joined {employee.joinDate}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{employee.position}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{employee.department}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{employee.email}</div>
                                                    <div className="text-sm text-gray-500">{employee.phone}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <StatusBadge status={employee.status} />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex gap-3">
                                                        <button onClick={() => setViewEmployee(true)} className="text-blue-600 hover:text-blue-900">
                                                            <FaEye className="text-lg" />
                                                        </button>
                                                        <button onClick={()=>seteditprofile(true)} className="text-green-600 hover:text-green-900">
                                                            <FaEdit className="text-lg" />
                                                        </button>
                                                        <button className="text-red-600 hover:text-red-900">
                                                            <FaTrash className="text-lg" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-8 text-center">
                                                <div className="text-gray-500">
                                                    <div className="text-lg mb-2">No employees found</div>
                                                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer */}
                        {viewEmployee && <EmployeeProfile message={{ setViewEmployee, viewEmployee }} /> }
                        {editprofile&&<EditProfile  message={{ seteditprofile, editprofile }}/>}
                         <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="text-sm text-gray-700">
                                    Showing <span className="font-bold">1</span> to <span className="font-bold">{filteredEmployees.length}</span> of{' '}
                                    <span className="font-bold">{filteredEmployees.length}</span> results
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
                                        Previous
                                    </button>
                                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                                        1
                                    </button>
                                    <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
                                        2
                                    </button>
                                    <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        ))



};

export default EmployeeDetails;