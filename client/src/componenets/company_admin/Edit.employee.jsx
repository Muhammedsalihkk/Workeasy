import React, { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { employee_profile_get } from '../Redux/Slice/Employee/Profile';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { edit_employee } from '../Redux/Slice/Employee/Edit';

const positions = {
  Inventory: ["Stock Entry Officer", "Stock Verify Officer"],
  Sales: ["Order Entry Officer", "Order Verify Officer"],
};

const EditProfile = ({ message }) => {
  const { seteditprofile, employeeid } = message;
  console.log(employeeid);
  
  const dispatch = useDispatch();
  const { employee_profile_response } = useSelector((state) => state.employee_profile);
  const [employee, setEmployee] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        await dispatch(employee_profile_get(employeeid)).unwrap();
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [dispatch, employeeid]);

  useEffect(() => {
    setEmployee(employee_profile_response.response);
  }, [employee_profile_response]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: employee?.name || "",
      number: employee?.number || "",
      shift: employee?.shift || "",
      department: employee?.department || "",
      company_role: employee?.company_role || "",
      Salary: employee?.Salary || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      number: Yup.string().required("Phone is required"),
      shift: Yup.string()
        .oneOf(['morning', 'evening', 'night'], 'Invalid shift selection')
        .required("Shift is required"),
      department: Yup.string()
        .oneOf(['Inventory', 'Sales'], 'Invalid department selection')
        .required("Department is required"),
      company_role: Yup.string()
        .when('department', (department, schema) => {
          if (department && positions[department]) {
            return schema.oneOf(positions[department], 'Invalid position selection');
          }
          return schema.required('Position is required');
        }),
      Salary: Yup.number()
        .typeError('Salary must be a number')
        .required("Salary is required"),
    }),
    onSubmit: async (values) => {
      try{
        const response=dispatch(edit_employee({id:employee._id,data:values})).unwrap()
       if(response){
         seteditprofile(false)
       }
      }
      catch(error){
        console.log(error);
      }
      
    },
  });

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-[5px] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
          <button
            onClick={() => seteditprofile(false)}
            className="text-gray-500 hover:text-gray-700 text-5xl font-bold"
          >
            &times;
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="flex items-center pb-3">
            <FiUser className="text-gray-500 mr-4" />
            <div className="flex-1">
              <label className="block text-gray-600 text-sm">Full Name</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your name"
                className="w-full mt-1 border-b focus:outline-none focus:border-blue-500"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs">{formik.errors.name}</p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-center pb-3">
            <FiUser className="text-gray-500 mr-4" />
            <div className="flex-1">
              <label className="block text-gray-600 text-sm">Phone</label>
              <input
                type="text"
                name="number"
                value={formik.values.number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your phone number"
                className="w-full mt-1 border-b focus:outline-none focus:border-blue-500"
              />
              {formik.touched.number && formik.errors.number && (
                <p className="text-red-500 text-xs">{formik.errors.number}</p>
              )}
            </div>
          </div>

          {/* Shift */}
          <div className="flex items-center pb-3">
            <FiUser className="text-gray-500 mr-4" />
            <div className="flex-1">
              <label className="block text-gray-600 text-sm">Shift</label>
              <select
                name="shift"
                value={formik.values.shift}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full mt-1 border-b focus:outline-none focus:border-blue-500"
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
          </div>

          {/* Department */}
          <div className="flex items-center pb-3">
            <FiUser className="text-gray-500 mr-4" />
            <div className="flex-1">
              <label className="block text-gray-600 text-sm">Department</label>
              <select
                name="department"
                value={formik.values.department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full mt-1 border-b focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Department</option>
                <option value="Inventory">Inventory</option>
                <option value="Sales">Sales</option>
              </select>
              {formik.touched.department && formik.errors.department && (
                <p className="text-red-500 text-xs">{formik.errors.department}</p>
              )}
            </div>
          </div>

          {/* Position */}
          <div className="flex items-center pb-3">
            <FiUser className="text-gray-500 mr-4" />
            <div className="flex-1">
              <label className="block text-gray-600 text-sm">Position</label>
              <select
                name="company_role"
                value={formik.values.company_role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full mt-1 border-b focus:outline-none focus:border-blue-500"
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
          </div>

          {/* Salary */}
          <div className="flex items-center pb-3">
            <FiUser className="text-gray-500 mr-4" />
            <div className="flex-1">
              <label className="block text-gray-600 text-sm">Basic Salary</label>
              <input
                type="number"
                name="Salary"
                value={formik.values.Salary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your salary"
                className="w-full mt-1 border-b focus:outline-none focus:border-blue-500"
              />
              {formik.touched.Salary && formik.errors.Salary && (
                <p className="text-red-500 text-xs">{formik.errors.Salary}</p>
              )}
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {formik.isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
