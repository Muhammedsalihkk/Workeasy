import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { createOrder, resetStatus } from '../../../store/slices/Slice/orders/createOne';
import { motion, AnimatePresence } from 'framer-motion';
import withReactContent from 'sweetalert2-react-content';

// Modal Component
function OrderModal({ isOpen, onClose, message }) {

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.3 } }}
            exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.2 } }}
          >
            <h2 className="text-2xl font-semibold mb-4">{message}</h2>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// AddOrderForm Component
export default function AddOrderForm() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.orders);
const MySwal = withReactContent(Swal);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const initialValues = {
    customerName: '',
    product: '',
    quantity: '',
    status: 'pending',
    deliveryDate: '',
    paymentStatus: 'pending',
  };

  const validationSchema = Yup.object({
    customerName: Yup.string().required('Customer name is required'),
    product: Yup.string().required('Product is required'),
    quantity: Yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
    deliveryDate: Yup.date().required('Delivery date is required'),
  });

  useEffect(() => {
    if (success) {
      setModalMessage('Order created successfully!');
      setModalOpen(true);
      dispatch(resetStatus());
    }

    if (error) {
      setModalMessage(`Error: ${error}`);
      setModalOpen(true);
    }
  }, [success, error, dispatch]);

const handleSubmit = (values, { resetForm }) => {
  MySwal.fire({
    title: 'Confirm Order',
    text: "Are you sure you want to create this order?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, create it!',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#2563EB', // Tailwind blue-600
    cancelButtonColor: '#6B7280',  // Tailwind gray-500
    reverseButtons: true,
    focusCancel: true,
    background: '#f9fafb',
    customClass: {
      title: 'text-lg font-semibold',
      confirmButton: 'px-4 py-2 rounded-xl bg-blue-600 text-white',
      cancelButton: 'px-4 py-2 rounded-xl bg-gray-300 text-black',
      popup: 'rounded-2xl shadow-lg'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      // Dispatch the order creation
      dispatch(createOrder(values)).then((res) => {
        if (res.type === 'orders/createOrder/fulfilled') {
          resetForm();
          setModalMessage('Order created successfully!');
          setModalOpen(true);
        }
      });
    }
  });
};


  return (
    <div className=" -mt-10 bg-gray-50 flex  justify-center ">
      <div className="w-160 max-w-5xl bg-white shadow-md rounded-3xl overflow-hidden">

        {/* Header */}
        <div className="bg-gray-900 p-8 flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
            <ShoppingCart className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-white">Create New Order</h1>
            <p className="text-gray-300 text-sm mt-1">Fill in the order details below</p>
          </div>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="p-8 space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                  <Field
                    type="text"
                    name="customerName"
                    placeholder="Enter customer name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-1 focus:ring-gray-400 focus:outline-none text-sm"
                  />
                  <ErrorMessage name="customerName" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Product */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                  <Field
                    type="text"
                    name="product"
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-1 focus:ring-gray-400 focus:outline-none text-sm"
                  />
                  <ErrorMessage name="product" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <Field
                    type="number"
                    name="quantity"
                    min="1"
                    placeholder="Enter quantity"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-1 focus:ring-gray-400 focus:outline-none text-sm"
                  />
                  <ErrorMessage name="quantity" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Delivery Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                  <Field
                    type="date"
                    name="deliveryDate"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-1 focus:ring-gray-400 focus:outline-none text-sm"
                  />
                  <ErrorMessage name="deliveryDate" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Order Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
                  <Field
                    as="select"
                    name="status"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-1 focus:ring-gray-400 focus:outline-none text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </Field>
                </div>

                {/* Payment Status */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                  <div className="flex gap-3">
                    {['pending', 'paid', 'failed'].map(status => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFieldValue('paymentStatus', status)}
                        className={`px-6 py-3 rounded-2xl border text-sm font-medium transition ${
                          values.paymentStatus === status
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-medium hover:bg-gray-800 transition text-sm"
                >
                  {loading ? 'Creating...' : 'Create Order'}
                </button>
                <button
                  type="reset"
                  className="px-8 py-3 bg-gray-100 text-gray-800 rounded-2xl font-medium hover:bg-gray-200 transition text-sm"
                >
                  Reset
                </button>
              </div>

            </Form>
          )}
        </Formik>
      </div>

      {/* Modal */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
}
