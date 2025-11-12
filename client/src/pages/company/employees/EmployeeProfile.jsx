import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { getProfileImage, appendImageToFormData } from '../../../utils/imageUtil';
import {
  PencilSquareIcon,
  ArrowLeftIcon,
  CheckIcon,
  XMarkIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import { employee_profile_get } from "../../../store/slices/Slice/userSlice/Profile";
import {
  employee_edit,
  clearError,
} from "../../../store/slices/Slice/userSlice/Edit";

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);

  const { user_profile_response, loading, error } = useSelector(
    (state) => state.user_profile
  );
  const { editLoading, editError } = useSelector((state) => state.user_edit);

  // Fetch employee profile
  useEffect(() => {
    if (id) {
      dispatch(employee_profile_get(id));
    }
  }, [id, dispatch]);

  // Update local state when profile is fetched
  useEffect(() => {
    if (user_profile_response?.success && user_profile_response?.data) {
      setUserData(user_profile_response.data);
    }
  }, [user_profile_response]);

  // Formik setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      number: userData?.number || "",
      gender: userData?.gender || "",
      dob: userData?.dob || "",
      shift: typeof userData?.shift === "object" && userData?.shift !== null
        ? {
            type: userData?.shift?.type || "",
            startTime: userData?.shift?.startTime || "",
            endTime: userData?.shift?.endTime || "",
          }
        : { type: "", startTime: "", endTime: "" },
      join_date: userData?.join_date || "",
      department: userData?.department || "",
      company_role: userData?.company_role || "",
      qualification: userData?.qualification || "",
      employee_id: userData?.employee_id || "",
      status: userData?.status || "active",
      address_place: userData?.Address?.place || "",
      address_pin: userData?.Address?.pin || "",
      address_distct: userData?.Address?.distct || "",
      address_state: userData?.Address?.state || "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      email: yup.string().email("Enter valid email").required("Email required"),
      number: yup
        .string()
        .required("Phone required")
        .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile starting with 6-9"),
      gender: yup.string().oneOf(["Male", "Female", "Other"]).required("Gender is required"),
      company_role: yup.string().oneOf(["Admin", "Employee"]).required("Role is required"),
      qualification: yup.string().required("Qualification is required"),
      employee_id: yup
        .string()
        .when("company_role", {
          is: (role) => role === "Employee",
          then: (schema) => schema.required("Employee ID is required"),
          otherwise: (schema) => schema.optional(),
        }),
      dob: yup
        .string()
        .when("company_role", {
          is: (role) => role === "Employee",
          then: (schema) => schema.required("DOB is required"),
          otherwise: (schema) => schema.optional(),
        }),
      join_date: yup
        .string()
        .when("company_role", {
          is: (role) => role === "Employee",
          then: (schema) => schema.required("Join date is required"),
          otherwise: (schema) => schema.optional(),
        }),
      department: yup
        .string()
        .when("company_role", {
          is: (role) => role === "Employee",
          then: (schema) =>
            schema
              .oneOf(["StockDepartment", "SalesDepartment"])
              .required("Department is required"),
          otherwise: (schema) => schema.optional(),
        }),
      // Shift validation: required and structured when Employee
      shift: yup.mixed().when("company_role", {
        is: (role) => role === "Employee",
        then: () =>
          yup
            .object({
              type: yup
                .string()
                .oneOf(["Morning", "Evening", "Night", "Flexible"])
                .required("Shift type required"),
              startTime: yup.string().required("Start time required"),
              endTime: yup.string().required("End time required"),
            })
            .required(),
        otherwise: () => yup.mixed().optional(),
      }),
      // Address fields are optional
      address_place: yup.string().optional(),
      address_pin: yup
      .number()
      .typeError("PIN must be a number")
      .test(
        "len-or-empty",
        "PIN must be 6 digits",
        (val) => !val || String(val).length === 6
      ),
      address_distct: yup.string().optional(),
      address_state: yup.string().optional(),
    }),
    onSubmit: async (values) => {
   
      try {
       
        const address = {};
        if (values.address_place) address.place = values.address_place;
        if (values.address_pin) {
          const parsed = parseInt(values.address_pin, 10);
          if (!Number.isNaN(parsed)) {
            address.pin = parsed;
          }
        }
        if (values.address_distct) address.distct = values.address_distct;
        if (values.address_state) address.state = values.address_state;

        // Prepare payload
        const payload = {
          name: values.name,
          email: values.email,
          number: values.number,
          gender: values.gender,
          dob: values.dob || undefined,
          join_date: values.join_date || undefined,
          department: values.department || undefined,
          company_role: values.company_role,
          qualification: values.qualification,
          employee_id: values.employee_id || undefined,
          status: values.status,
        };
        
        // Shift only for Employees; ensure correct shape
        if (values.company_role === "Employee") {
          payload.shift = {
            type: values.shift?.type || "",
            startTime: values.shift?.startTime || "",
            endTime: values.shift?.endTime || "",
          };
        } else {
          // Admin: remove department and shift from payload
          delete payload.department;
          delete payload.shift;
        }

        // Add address only if it has values
        if (Object.keys(address).length > 0) {
          payload.Address = address;
        }
      
        const response = await dispatch(
          
          employee_edit({ employeeId: id, data: payload })
        ).unwrap();

        if (response.success) {
          toast.success("Profile updated successfully!");
          dispatch(clearError());
          setIsEditing(false);
          // Refresh profile data
          dispatch(employee_profile_get(id));
        }
      } catch (error) {
        toast.error(error?.message || "Failed to update profile");
        console.error("Edit error:", error);
      }
    },
  });

  

  // Handle image upload
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      // append under both names so backend that expects either will work
      appendImageToFormData(formData, file);

      const response = await dispatch(
        employee_edit({ employeeId: id, data: formData })
      ).unwrap();

      if (response.success) {
        toast.success("Profile image updated successfully!");
        // Refresh profile data
        dispatch(employee_profile_get(id));
      }
    } catch (error) {
      toast.error(error?.message || "Failed to update image");
      console.error("Image upload error:", error);
    }
  };
console.log(formik.errors);

  const handleEditImage = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    setIsEditing(false);
    formik.resetForm();
    dispatch(clearError());
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load profile</p>
          <button
            onClick={() => navigate("/employees")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Employees
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      <div className="ml-64 min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => navigate("/employees")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Employees</span>
            </button>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <PencilSquareIcon className="w-5 h-5" />
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Profile Header */}
            <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-800">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 opacity-90"></div>
              <div className="relative z-10 flex items-center gap-6 p-6">
                <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
                  <img
                    src={getProfileImage(userData)}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                  {isEditing && (
                    <button
                      onClick={handleEditImage}
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <CameraIcon className="w-8 h-8 text-white" />
                    </button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">
                    {userData?.name || "Loading..."}
                  </h1>
                  <p className="text-blue-200 text-lg mb-1">
                    {userData?.department || userData?.company_role || "N/A"}
                  </p>
                  <p className="px-4 py-2 text-gray-900 font-medium">
                    {formik.values.shift && (formik.values.shift.type || formik.values.shift.startTime || formik.values.shift.endTime)
                      ? `${formik.values.shift.type || ""} ${formik.values.shift.startTime || ""} - ${formik.values.shift.endTime || ""}`
                      : "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={formik.handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="px-4 py-2 text-gray-900 font-medium">
                      {formik.values.name || "-"}
                    </p>
                  )}
                  {formik.touched.name && formik.errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="px-4 py-2 text-gray-900 font-medium">
                      {formik.values.email || "-"}
                    </p>
                  )}
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="number"
                      value={formik.values.number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="px-4 py-2 text-gray-900 font-medium">
                      {formik.values.number || "-"}
                    </p>
                  )}
                  {formik.touched.number && formik.errors.number && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.number}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="px-4 py-2 text-gray-900 font-medium">
                      {formik.values.gender || "-"}
                    </p>
                  )}
                  {formik.touched.gender && formik.errors.gender && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.gender}
                    </p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dob"
                      value={formik.values.dob || ""}
                      onChange={formik.handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="px-4 py-2 text-gray-900 font-medium">
                      {formik.values.dob
                        ? new Date(formik.values.dob).toLocaleDateString()
                        : "-"}
                    </p>
                  )}
                </div>

                {/* Shift */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shift
                  </label>
                  {isEditing ? (
                    formik.values.company_role === "Employee" ? (
                      <div className="space-y-2">
                        <select
                          name="shift.type"
                          value={formik.values.shift?.type}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select type</option>
                          <option value="Morning">Morning</option>
                          <option value="Evening">Evening</option>
                          <option value="Night">Night</option>
                          <option value="Flexible">Flexible</option>
                        </select>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="time"
                            name="shift.startTime"
                            value={formik.values.shift?.startTime}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="time"
                            name="shift.endTime"
                            value={formik.values.shift?.endTime}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        {formik.touched.shift && typeof formik.errors.shift === "object" && (
                          <div className="text-sm text-red-600">
                            {formik.errors.shift?.type || formik.errors.shift?.startTime || formik.errors.shift?.endTime}
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        type="text"
                        disabled
                        value="Not required for Admin"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                      />
                    )
                  ) : (
                    <p className="px-4 py-2 text-gray-900 font-medium">
                      {formik.values.shift && (formik.values.shift.type || formik.values.shift.startTime || formik.values.shift.endTime)
                        ? `${formik.values.shift.type || ""} ${formik.values.shift.startTime || ""} - ${formik.values.shift.endTime || ""}`
                        : "-"}
                    </p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  {isEditing ? (
                    <select
                      name="department"
                      value={formik.values.department}
                      onChange={formik.handleChange}
                      disabled={formik.values.company_role === "Admin"}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Department</option>
                      <option value="StockDepartment">Stock Department</option>
                      <option value="SalesDepartment">Sales Department</option>
                    </select>
                  ) : (
                    <p className="px-4 py-2 text-gray-900 font-medium">
                      {formik.values.department || "-"}
                    </p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  {isEditing ? (
                    <select
                      name="company_role"
                      value={formik.values.company_role}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="Employee">Employee</option>
                    </select>
                  ) : (
                    <p className="px-4 py-2 text-gray-900 font-medium">
                      {formik.values.company_role || "-"}
                    </p>
                  )}
                  {formik.touched.company_role &&
                    formik.errors.company_role && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.company_role}
                      </p>
                    )}
                </div>

                {/* Qualification */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualification
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="qualification"
                      value={formik.values.qualification}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="px-4 py-2 text-gray-900 font-medium">
                      {formik.values.qualification || "-"}
                    </p>
                  )}
                  {formik.touched.qualification &&
                    formik.errors.qualification && (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.qualification}
                      </p>
                    )}
                </div>

                {/* Employee ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee ID
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="employee_id"
                      value={formik.values.employee_id}
                      onChange={formik.handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="px-4 py-2 text-gray-900 font-medium">
                      {formik.values.employee_id || "-"}
                    </p>
                  )}
                  {formik.touched.employee_id && formik.errors.employee_id && (
                    <p className="mt-1 text-sm text-red-600">
                      {formik.errors.employee_id}
                    </p>
                  )}
                </div>

                {/* Join Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Join Date
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="join_date"
                      value={formik.values.join_date || ""}
                      onChange={formik.handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="px-4 py-2 text-gray-900 font-medium">
                      {formik.values.join_date
                        ? new Date(formik.values.join_date).toLocaleDateString()
                        : "-"}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  {isEditing ? (
                    <select
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  ) : (
                    <p className="px-4 py-2">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          formik.values.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {formik.values.status === "active"
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </p>
                  )}
                </div>

                {/* Address - Place */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address - Place
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address_place"
                      value={formik.values.address_place}
                      onChange={formik.handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="px-4 py-2 text-gray-900 font-medium">
                      {formik.values.address_place || "-"}
                    </p>
                  )}
                </div>

                {/* Address - District */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address - District
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address_distct"
                      value={formik.values.address_distct}
                      onChange={formik.handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="px-4 py-2 text-gray-900 font-medium">
                      {formik.values.address_distct || "-"}
                    </p>
                  )}
                </div>

                {/* Address - State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address - State
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address_state"
                      value={formik.values.address_state}
                      onChange={formik.handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="px-4 py-2 text-gray-900 font-medium">
                      {formik.values.address_state || "-"}
                    </p>
                  )}
                </div>

                {/* Address - PIN */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address - PIN Code
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address_pin"
                      value={formik.values.address_pin}
                      onChange={formik.handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="px-4 py-2 text-gray-900 font-medium">
                      {formik.values.address_pin || "-"}
                    </p>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {editError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">
                    {editError?.message || "Failed to update profile"}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              {isEditing && (
                <div className="mt-6 flex items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    <XMarkIcon className="w-5 h-5" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {editLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckIcon className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;
