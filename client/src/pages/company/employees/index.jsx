import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  Filter,
  Plus,
  Download,
  Trash2,
  X,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Edit,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../store/slices/Slice/userSlice/getAll";
import { getProfileImage } from '../../../utils/imageUtil';
import { deleteEmployee } from "../../../store/slices/Slice/userSlice/Delete";

export default function EmployeesTable() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.employees);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10); // Limit per page
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [hiddenIds, setHiddenIds] = useState(new Set());
  const [undoInfo, setUndoInfo] = useState(null); // { id, name, timerId }

  const menuRef = useRef();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    department: "",
    status: "",
    role: "",
  });

  // Fetch employees from API
  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, filters.status, filters.department, filters.role, currentPage]);

  // Debounce searchTerm (300ms delay)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchEmployees = async () => {
    try {
      const params = {};
      if (debouncedSearch) params.search = debouncedSearch;
      if (filters.status) params.status = filters.status;
      if (filters.department) params.department = filters.department;
      if (filters.role) params.role = filters.role;
      if (currentPage) params.page = currentPage;
      if (limit) params.limit = limit;
      
      await dispatch(getAllUsers(params)).unwrap();
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  const handleEmployeeCreated = () => {
    // Refresh the employees list after creating a new employee
    fetchEmployees();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowAddMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Transform API data to match component expectations
  const employees = users && Array.isArray(users) ? users.map((emp) => ({
    _id: emp._id,
    name: emp.name || "N/A",
    email: emp.email || "N/A",
    phone: emp.number || "N/A",
    department: emp.department || "N/A",
    role: emp.company_role || "N/A",
    status: emp.status || "active", // Keep original status for filtering
    statusDisplay: emp.status === "active" ? "Working" : "Absent", // For display
    location: emp.Address ? `${emp.Address.distct || ""}${emp.Address.distct && emp.Address.state ? ", " : ""}${emp.Address.state || ""}`.trim() || "N/A" : "N/A",
    joinDate: emp.join_date || "N/A",
  avatar: getProfileImage(emp),
    shift: emp.shift || "N/A",
    employee_id: emp.employee_id || "N/A",
  })) : [];
  const visibleEmployees = employees.filter((e) => !hiddenIds.has(e._id));

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  const startDelayedDelete = (id, name) => {
    // Optimistically hide the row
    setHiddenIds((prev) => new Set(prev).add(id));

    // Start a 5s timer before actual delete
    const timerId = setTimeout(async () => {
      try {
        await dispatch(deleteEmployee({ employeeId: id })).unwrap();
        // After delete, refresh current page
        fetchEmployees();
      } catch (err) {
        // On error, unhide the row
        setHiddenIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        console.error("Delete failed:", err);
      } finally {
        // Clear undo banner if still showing for this id
        setUndoInfo((info) => (info && info.id === id ? null : info));
      }
    }, 5000);

    setUndoInfo({ id, name, timerId });
  };

  const confirmDelete = () => {
    const id = confirmDeleteId;
    const name = employees.find((e) => e._id === id)?.name || "employee";
    setConfirmDeleteId(null);
    startDelayedDelete(id, name);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const undoDelete = () => {
    if (!undoInfo) return;
    clearTimeout(undoInfo.timerId);
    // Unhide
    setHiddenIds((prev) => {
      const next = new Set(prev);
      next.delete(undoInfo.id);
      return next;
    });
    setUndoInfo(null);
  };





  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (
      selectedRows.length === employees.length &&
      employees.length > 0
    ) {
      setSelectedRows([]);
    } else {
      setSelectedRows(employees.map((e) => e._id));
    }
  };

  const getStatusBadge = (status) => {
    if (status === "Working" || status === "active") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          Active
        </span>
      );
    } else if (status === "Absent" || status === "inactive") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          Inactive
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
        {status}
      </span>
    );
  };

  const departments = [...new Set(employees.map((e) => e.department).filter(Boolean))];
  const roles = [...new Set(employees.map((e) => e.role).filter(Boolean))];

  return (
    <div className="relative ml-64">
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, department, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
            />
          </div>
          
          {loading && (
            <div className="ml-4 text-sm text-gray-500">Loading...</div>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-3 ml-4 relative" ref={menuRef}>
            {/* Filters */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            {/* Add Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowAddMenu(!showAddMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Employee
              </button>

              {showAddMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      setShowAddMenu(false);
                      navigate("/employees/new");
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <UserPlus className="w-4 h-4 mr-2 text-blue-600" />
                    Add Individual Employee
                  </button>
                  <button
                    onClick={() => {
                      setShowAddMenu(false);
                      // navigate("/employees/bulk-upload");
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Download className="w-4 h-4 mr-2 text-blue-600" />
                    Bulk Import
                  </button>
                </div>
              )}
            </div>

            {/* Export */}
            <button
              onClick={() => {
                // Handle export
              }}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-medium text-sm"
            >
              <Download className="w-4 h-4 inline mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">
                Filter Options
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-gray-100 rounded transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <select
                  value={filters.department}
                  onChange={(e) =>
                    setFilters({ ...filters, department: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={filters.role}
                  onChange={(e) =>
                    setFilters({ ...filters, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">All Roles</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setFilters({
                    department: "",
                    status: "",
                    role: "",
                  })
                }
                className="text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                Clear All Filters
              </button>

              <div className="text-sm text-gray-600">
                Showing {employees.length} employees
              </div>
            </div>
          </div>
        )}

        {/* Employees Table */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="bg-white m-6 rounded-lg shadow-sm border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="w-12 px-6 py-3">
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.length === employees.length &&
                        employees.length > 0
                      }
                      onChange={toggleAllRows}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 bg-white">
                        {loading ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                      Loading employees...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-red-500">
                      Error loading employees: {typeof error === 'string' ? error : (error?.message || error?.error || "Unknown error")}
                      <button 
                        onClick={() => fetchEmployees()}
                        className="mt-2 ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Retry
                      </button>
                    </td>
                  </tr>
                ) : visibleEmployees.length > 0 ? (
                  visibleEmployees.map((employee) => (
                    <tr
                      key={employee._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(employee._id)}
                          onChange={() => toggleRowSelection(employee._id)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {employee.avatar ? (
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={employee.avatar}
                                alt={employee.name}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {employee.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {employee.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700">
                          <div className="flex items-center gap-2 mb-1">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {employee.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {employee.location}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {employee.role}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(employee.statusDisplay || employee.status)}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {employee.joinDate && employee.joinDate !== "N/A" 
                          ? new Date(employee.joinDate).toLocaleDateString() 
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/employees/profile/${employee._id}`);
                            }}
                            className="p-2 hover:bg-blue-50 rounded transition text-blue-600"
                            title="View Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(employee._id);
                            }}
                            className="p-2 hover:bg-red-50 rounded transition text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  
      {/* Pagination */}
      <div className="px-6 pb-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">Page {currentPage}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={employees.length < limit}
            className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={cancelDelete} />
          <div className="relative bg-white w-full max-w-md mx-4 rounded-2xl shadow-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Employee</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this employee? You can undo within 5 seconds after delete.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Undo Snackbar */}
      {undoInfo && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-4">
            <span>
              Deleted {undoInfo.name}. <span className="opacity-80">Undo?</span>
            </span>
            <button
              onClick={undoDelete}
              className="px-3 py-1 rounded bg-white text-gray-900 font-medium"
            >
              Undo
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

