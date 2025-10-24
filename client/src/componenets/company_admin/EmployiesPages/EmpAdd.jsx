import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { add_user, errorclear } from '../../Redux/Slice/userSlice/Register';

const EmployeeAddForm = ({ setAddEmployee }) => {
  const { error, loading, employee_response_data } = useSelector((state) => state.employee_register)
  const dispatch = useDispatch()
  const validationSchema = Yup.object({
    employee_id: Yup.string().required('Employee ID is required'),
    name: Yup.string().required('Name is required'),
    join_date: Yup.date().required('Join date is required'),
    shift: Yup.string()
      .oneOf(['morning', 'evening', 'night'], 'Invalid shift selection')
      .required('Shift is required'),
    gender: Yup.string().required('Gender is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    number: Yup.string()
      .matches(/^\d+$/, 'Must be only digits')
      .required('Phone number is required'),
    company_role: Yup.string().required('Role is required'),
    department: Yup.string().required('Department is required'),
    salary: Yup.number()
      .typeError('Salary must be a number')
      .required('Salary is required'),
    qualification: Yup.string().required('Qualification is required'),
  });

  const positions = {
    Inventory: ["Stock Entry Officer", "Stock Verify Officer"],
    Sales: ["Order Entry Officer", "Order Verify Officer"],
  };

  
  const formik = useFormik({
    initialValues: {
      employee_id: '',
      name: '',
      join_date: '',
      shift: '',
      gender: '',
      password: '',
      email: '',
      number: '',
      company_role: '',
      department: '',
      salary: '',
      qualification: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);

      try {
        const response = await dispatch(add_user(values)).unwrap();
        setAddEmployee(false);
        toast.success("Employee added successfully", {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });



  return (
    <form onSubmit={formik.handleSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Add Employee</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-400 focus:outline-none"
            required
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs">{formik.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-400 focus:outline-none"
            required
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs">{formik.errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="text"
            name="number"
            placeholder="Phone"
            value={formik.values.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-400 focus:outline-none"
            required
          />
          {formik.touched.number && formik.errors.number && (
            <p className="text-red-500 text-xs">{formik.errors.number}</p>
          )}
        </div>

        {/* Employee ID */}
        <div>
          <input
            type="text"
            name="employee_id"
            placeholder="Employee ID"
            value={formik.values.employee_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-400 focus:outline-none"
            required
          />
          {formik.touched.employee_id && formik.errors.employee_id && (
            <p className="text-red-500 text-xs">{formik.errors.employee_id}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-400 focus:outline-none"
            required
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs">{formik.errors.password}</p>
          )}
        </div>

        {/* Salary */}
        <div>
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formik.values.salary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-400 focus:outline-none"
            required
          />
          {formik.touched.salary && formik.errors.salary && (
            <p className="text-red-500 text-xs">{formik.errors.salary}</p>
          )}
        </div>

        {/* Qualification */}
        <div>
          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            value={formik.values.qualification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-400 focus:outline-none"
            required
          />
          {formik.touched.qualification && formik.errors.qualification && (
            <p className="text-red-500 text-xs">{formik.errors.qualification}</p>
          )}
        </div>

        {/* Department */}
        <div>
          <select
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="">Select Department</option>
            <option value="Inventory">Inventory / Stores</option>
            <option value="Sales">Sales / Order Processing</option>
          </select>
          {formik.touched.department && formik.errors.department && (
            <p className="text-red-500 text-xs">{formik.errors.department}</p>
          )}
        </div>

        {/* Position */}
        <div>
          <select
            name="company_role"
            value={formik.values.company_role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-400 focus:outline-none"
            required
            disabled={!formik.values.department}
          >
            <option value="">Select Position</option>
            {formik.values.department &&
              positions[formik.values.department].map((pos) => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
          </select>
          {formik.touched.company_role && formik.errors.company_role && (
            <p className="text-red-500 text-xs">{formik.errors.company_role}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <p className="text-red-500 text-xs">{formik.errors.gender}</p>
          )}
        </div>

        {/* Shift */}
        <div>
          <select
            name="shift"
            value={formik.values.shift}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="">Select Shift</option>
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>
          {formik.touched.shift && formik.errors.shift && (
            <p className="text-red-500 text-xs">{formik.errors.shift}</p>
          )}
        </div>

        {/* Join Date */}
        <div>
          <input
            type="date"
            name="join_date"
            value={formik.values.join_date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-blue-400 focus:outline-none"
            required
          />
          {formik.touched.join_date && formik.errors.join_date && (
            <p className="text-red-500 text-xs">{formik.errors.join_date}</p>
          )}
        </div>
      </div>

      {error && <p className='text-red-600 ml-12'>{error.message}</p>}

      <div className="flex justify-end pt-4 space-x-4">
        <button
          type="button"
          onClick={() => {
            setAddEmployee(false)
            dispatch(errorclear())
          }}
          className="px-6 py-2 bg-gray-300 text-sm rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
          className={`px-6 py-2 rounded text-sm ${!(formik.isValid && formik.dirty)
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
        >
          {!loading ? "Submit" : "Submitting..."}
        </button>
      </div>
    </form>

  );
};

export default EmployeeAddForm;
