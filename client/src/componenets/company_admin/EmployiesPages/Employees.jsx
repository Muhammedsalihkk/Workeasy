// src/EmployeeDetails.js
import React, { useState, useMemo, useEffect } from 'react';
import { FaSearch, FaSort, FaUserPlus, FaFilter, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import EmployeeProfile from './EmpProfile';
import EditProfile from '../Edit.employee';
import { getAllUsers } from '../../Redux/Slice/userSlice/AllEmployees';
import { delete_employee } from '../../Redux/Slice/userSlice/Edit';
import EmployeeAddForm from './EmpAdd';


const EmployeeDetails = () => {

    const header = <div className='flex gap-2.5'>
        <UserGroupIcon className="w-7 h-7 text-gray-700" />
        <h2 className="text-xl font-bold text-gray-800">Employee</h2></div>
    const [employees, setemployees] = useState([])

    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [viewEmployee, setViewEmployee] = useState(false)
    const [editprofile, seteditprofile] = useState(false)
    const [addempoyee, Setaddemployee] = useState(false)
    const [employeeid, setemployeeid] = useState(null)
    const [showConfirm, setShowConfirm] = useState(false);
    const { loading, error, employee_response_data } = useSelector((state) => state.get_all_employees)
    const { employee_delete_response, delete_loading, delete_error } = useSelector((satate) => satate.employee_edit)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
    }, [addempoyee, editprofile, delete_loading,])
    useEffect(() => {
        setemployees(employee_response_data)
        console.log(employee_response_data);


    }, [employee_response_data, editprofile, delete_loading,])
    console.log(employees);

    const delete_employeeById = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "you want to delet the employee",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_employee(id))
            } else {
                // ❌ User clicked Cancel
                console.log('Cancelled');
            }
        })

    }
    const SearchByname = () => {
        dispatch(getAllUsers({ search: searchTerm }))
    }
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

    // Status badge component
    const StatusBadge = ({ status }) => {
        let color = 'bg-gray-100 text-gray-800';
        if (status === 'active') color = 'bg-green-100 text-green-800';
        if (status === 'leave') color = 'bg-yellow-100 text-yellow-800';
        if (status === 'inactive') color = 'bg-red-100 text-red-800';

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
                {status}
            </span>
        );
    };
    return (

        (
            <div className="min-h-screen   w-full backdrop-blur-2xl py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto relative overflow-hidden">
                    {!addempoyee && (<div className='flex justify-end mb-8'>
                        <button
                            onClick={() => Setaddemployee(true)}
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <FaUserPlus className="text-sm" />
                            Add New Employee
                        </button>
                    </div>)}

                    {/* Employee Add Form */}
                    {/* Filters and Search */}
                    <div className={`${addempoyee ? 'blur-[1px]' : "bg-white rounded-xl shadow-md p-6 mb-8 "}`}>
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
                                    onChange={(e) => { setSearchTerm(e.target.value) }}
                                    onKeyDown={(e) => {
                                        if (e.key == "Enter") {
                                            SearchByname()
                                        }
                                    }}
                                />
                            </div>


                            <div>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={departmentFilter}
                                    onChange={(e) => { setDepartmentFilter(e.target.value), dispatch(getAllUsers({ department: e.target.value })) }}
                                >
                                    <option value="All">All Departments</option>
                                    <option value="Inventory">Inventory / Stores</option>
                                    <option value="Sales">Sales / Order Processing</option>
                                </select>
                            </div>


                            <div>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={statusFilter}
                                    onChange={(e) => {dispatch(getAllUsers({status:e.target.value})),setStatusFilter(e.target.value)}}
                                >
                                    <option value="active">Active</option>
                                    <option value="leave">Leave</option>
                                </select>

                            </div>


                        </div>
                    </div>
                    {/* Employee Table */}
                    <div className={`${addempoyee ? 'blur-[1px]' : 'bg-white rounded-xl shadow-md overflow-y-hidden pt-1 '}`}>
                        <div className="overflow-x-auto">
                            <div className='max-h-[405px]'>
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
                                        {employees && employees.length > 0 ? (
                                            employees.map((employee) => (
                                                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">#{employee.employee_id}</div>
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
                                                                <div className="text-sm text-gray-500">Joined {employee.join_date}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{employee.company_role}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{employee.department}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900">{employee.email}</div>
                                                        <div className="text-sm text-gray-500">{employee.number}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <StatusBadge status={employee.status} />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex gap-3">
                                                            <button onClick={() => { setemployeeid(employee._id), setViewEmployee(true) }} className="text-blue-600 hover:text-blue-900">
                                                                <FaEye className="text-lg" />
                                                            </button>
                                                            <button onClick={() => { setemployeeid(employee._id), seteditprofile(true) }} className="text-green-600 hover:text-green-900">
                                                                <FaEdit className="text-lg" />
                                                            </button>
                                                            <button onClick={() => delete_employeeById(employee._id)} className="text-red-600 hover:text-red-900">
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

                        </div>

                        {/* Table Footer */}
                        {viewEmployee && <EmployeeProfile message={{ setViewEmployee, viewEmployee, employeeid }} />}
                        {editprofile && <EditProfile message={{ seteditprofile, editprofile, employeeid }} />}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="text-sm text-gray-700">
                                    Showing <span className="font-bold">1</span> to <span className="font-bold">{employees?.length}</span> of{' '}
                                    <span className="font-bold">{employees?.length}</span> results
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
                    {addempoyee && (
                        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                            <div className="bg-white w-full max-w-md rounded-xl shadow-md p-6">
                                <EmployeeAddForm setAddEmployee={Setaddemployee} />
                            </div>
                        </div>

                    )}
                    {showConfirm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded shadow-md text-center">
                                <p className="mb-4">Are you sure you want to delete?</p>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        onClick={handleConfirmDelete}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={handleCancelDelete}
                                        className="bg-gray-500 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div>
        ))



};

export default EmployeeDetails;