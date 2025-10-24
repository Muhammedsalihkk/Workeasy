import React, { useState } from 'react';

const OrderDetail = () => {
  // Static order data
  const [order, setOrder] = useState({
    _id: "ord_123456789",
    customerName: "John Smith",
    product: "MacBook Pro 16-inch",
    quantity: 2,
    status: "pending",
    company_id: "comp_abc123",
    createdBy: "admin_user",
    updatedBy: "admin_user",
    deliveryDate: "2024-12-31T00:00:00.000Z",
    paymentStatus: "pending",
    isDelete: false,
    createdAt: "2024-01-15T10:30:00.000Z",
    updatedAt: "2024-01-15T10:30:00.000Z"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState({ ...order });

  // Format date to readable string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  // Payment status badge colors
  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'pending':
        return 'bg-orange-100 text-orange-800 border border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  // Handle Edit button click
  const handleEdit = () => {
    setIsEditing(true);
    setEditedOrder({ ...order });
  };

  // Handle Save button click
  const handleSave = () => {
    setOrder({ 
      ...editedOrder, 
      updatedAt: new Date().toISOString(),
      updatedBy: "current_user" 
    });
    setIsEditing(false);
  };

  // Handle Cancel button click
  const handleCancel = () => {
    setEditedOrder({ ...order });
    setIsEditing(false);
  };

  // Handle Delete button click
  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (confirmDelete) {
      setOrder({ ...order, isDelete: true });
      alert('Order marked as deleted!');
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEditedOrder(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          <div className="flex space-x-3">
            {!isEditing ? (
              <>
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-md shadow-sm transition-colors duration-200"
                >
                  Edit Order
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md shadow-sm transition-colors duration-200"
                >
                  Delete Order
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm transition-colors duration-200"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md shadow-sm transition-colors duration-200"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          {/* Order Status Bar */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-600">Order # {order._id}</span>
                <span className={`ml-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                Placed on {formatDate(order.createdAt)}
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-6">
            <div className="flex space-x-4 mb-6">
              
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedOrder.product}
                      onChange={(e) => handleInputChange('product', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    order.product
                  )}
                </h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Quantity: </span>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedOrder.quantity}
                        onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
                        className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="font-medium">{order.quantity}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-gray-600">Status: </span>
                    {isEditing ? (
                      <select
                        value={editedOrder.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Customer Name</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedOrder.customerName}
                        onChange={(e) => handleInputChange('customerName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Company ID</p>
                    <p className="font-medium text-gray-900">{order.company_id}</p>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Delivery Date</p>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editedOrder.deliveryDate.split('T')[0]}
                        onChange={(e) => handleInputChange('deliveryDate', e.target.value + 'T00:00:00.000Z')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="font-medium text-gray-900">{formatDate(order.deliveryDate)}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                    {isEditing ? (
                      <select
                        value={editedOrder.paymentStatus}
                        onChange={(e) => handleInputChange('paymentStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                      </select>
                    ) : (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Created By</p>
                  <p className="text-gray-900">{order.createdBy}</p>
                </div>
                <div>
                  <p className="text-gray-600">Last Updated By</p>
                  <p className="text-gray-900">{order.updatedBy}</p>
                </div>
                <div>
                  <p className="text-gray-600">Created At</p>
                  <p className="text-gray-900">{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Last Updated</p>
                  <p className="text-gray-900">{formatDate(order.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
     
      </div>
    </div>
  );
};

export default OrderDetail;