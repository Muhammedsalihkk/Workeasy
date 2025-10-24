import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  Filter,
  Plus,
  Download,
  Trash2,
  X,
  UserPlus,
  Users,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_orders } from "../../Redux/Slice/orders/getall";
import { massEditTransactions } from "../../Redux/Slice/orders/editAll";
import { useNavigate } from "react-router-dom";
import AddOrderForm from "./addNew";

export default function OrderTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [count, setCount] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const [massEdit, setMassEdit] = useState({
    paymentStatus: "",
    status: "",
    deliveryDate: "",
  });

  const [filters, setFilters] = useState({
    status: "",
    paymentStatus: "",
    deliveryFrom: undefined,
    deliveryTo: undefined,
  });

  const dispatch = useDispatch();

  // Debounce searchTerm (300ms delay)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Load all orders initially
  useEffect(() => {
    dispatch(get_all_orders({}));
  }, [dispatch, count]);

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

  const handleMassEdit = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to update these transactions?"
    );
    if (!isConfirmed) return;

    dispatch(
      massEditTransactions({
        ids: selectedRows,
        updates: massEdit,
      })
    );
    setCount(count + 1);
  };

  const { orders, loading, error } = useSelector((state) => state.orders);
  const transactions = orders?.data || [];

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    if (
      selectedRows.length === filteredTransactions.length &&
      filteredTransactions.length > 0
    ) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredTransactions.map((t) => t._id));
    }
  };

  const dateConvertion = (datestring) => {
    const date = new Date(datestring);
    return date.toISOString().split("T")[0];
  };

  // Debounced Search Filter
  const filteredTransactions = transactions.filter((transaction) => {
    const term = debouncedSearch.toLowerCase();
    if (!term) return true;
    return transaction.customerName?.toLowerCase().includes(term);
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex w-320 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
                Add Manually
              </button>

              {showAddMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      setShowAddMenu(false);
                      navigate("/orders/new"); // navigate to add order page
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <UserPlus className="w-4 h-4 mr-2 text-blue-600" />
                    Add Individual Order
                  </button>
                  <button
                    onClick={() => {
                      setShowAddMenu(false);
                      navigate("/orders/mass-upload"); // mass insertion page
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Users className="w-4 h-4 mr-2 text-blue-600" />
                    Mass Insertion
                  </button>
                </div>
              )}
            </div>

            {/* Refresh */}
            <button
              onClick={() => {
                dispatch(get_all_orders({}));
                setFilters({});
                setShowFilters(false);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-medium text-sm"
            >
              Refresh
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
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Payment Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Status
                </label>
                <select
                  value={filters.paymentStatus}
                  onChange={(e) =>
                    setFilters({ ...filters, paymentStatus: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              {/* Delivery Dates */}
              <div className="flex gap-2">
                <div className="flex flex-col">
                  <label className="text-sm mb-1">Delivery From:</label>
                  <input
                    type="date"
                    value={
                      filters.deliveryFrom
                        ? filters.deliveryFrom.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        deliveryFrom: e.target.value
                          ? new Date(e.target.value)
                          : undefined,
                      })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm mb-1">Delivery To:</label>
                  <input
                    type="date"
                    value={
                      filters.deliveryTo
                        ? filters.deliveryTo.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        deliveryTo: e.target.value
                          ? new Date(
                              new Date(e.target.value).setHours(23, 59, 59, 999)
                            )
                          : undefined,
                      })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Buttons inside filter panel */}
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setFilters({
                    status: "all",
                    paymentStatus: "all",
                    deliveryFrom: undefined,
                    deliveryTo: undefined,
                  })
                }
                className="text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                Clear All Filters
              </button>

              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-600">
                  Showing {filteredTransactions?.length} of {transactions.length}{" "}
                  transactions
                </div>
                <button
                  onClick={() => dispatch(get_all_orders(filters))}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mass Edit Panel */}
        {selectedRows.length > 0 && (
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              Edit {selectedRows.length} selected
            </span>
            <select
              value={massEdit.paymentStatus || ""}
              onChange={(e) =>
                setMassEdit({ ...massEdit, paymentStatus: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Payment Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>

            <select
              value={massEdit.status || ""}
              onChange={(e) =>
                setMassEdit({ ...massEdit, status: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>

            <input
              type="date"
              value={
                massEdit.deliveryDate
                  ? new Date(massEdit.deliveryDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setMassEdit({
                  ...massEdit,
                  deliveryDate: e.target.value
                    ? new Date(e.target.value)
                    : undefined,
                })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleMassEdit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm"
            >
              Update Selected
            </button>
          </div>
        )}

        {/* Transactions Table */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="bg-white m-6 rounded-lg shadow-sm border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="w-12 px-6 py-3">
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.length === filteredTransactions.length &&
                        filteredTransactions.length > 0
                      }
                      onChange={toggleAllRows}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 bg-white">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction._id}
                      className="hover:bg-gray-50 transition"
                      onClick={()=>navigate('/orders/detail')}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(transaction._id)}
                          onChange={() => toggleRowSelection(transaction._id)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {transaction.customerName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {dateConvertion(transaction.deliveryDate)}
                      </td>
                      <td className="px-6 py-4">{transaction.quantity}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {transaction.paymentStatus}
                      </td>
                      <td className="px-6 py-4">
                        {transaction.status === "pending" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                            Pending
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            Completed
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button className="p-2 hover:bg-gray-100 rounded transition">
                            <Download className="w-4 h-4 text-gray-500" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded transition">
                            <Trash2 className="w-4 h-4 text-gray-500" />
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
                      No transactions found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
