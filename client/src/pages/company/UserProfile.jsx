import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ToastContainer, toast } from "react-toastify";
import { CameraIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";
 
// Redux actions
import {
  otp_sending,
  otp_verify,
  changge_password,
} from "../../store/slices/Slice/userSlice/Password";
import { clearError, user_edit } from "../../store/slices/Slice/userSlice/Edit";
import { user_profile_get } from "../../store/slices/Slice/userSlice/Profile";
import { getProfileImage, appendImageToFormData } from "../../utils/imageUtil";
import { user_logout } from "../../store/slices/Slice/userSlice/Logout";

const UserProfile = () => {
  const MySwal = withReactContent(Swal);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setuserData] = useState();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showNewPasswordInputs, setShowNewPasswordInputs] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [errorotp, seterrorotp] = useState("");
  const [activities, setactivities] = useState([]);
  const [timer, setTimer] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const { otp_loading } = useSelector((state) => state.otp_sending);
  const { verify_loading } = useSelector((state) => state.otp_verify);
  const { change_loading } = useSelector((state) => state.password_change);

  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await dispatch(user_profile_get()).unwrap();
        setuserData(response.data);
        setactivities(response.activity || []);
      } catch (error) {
        console.log(error);
      }
    };
    getuser();
  }, [isEditing]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      number: userData?.number || "",
      gender: userData?.gender || "",
      dob: userData?.dob || "",
      shift: userData?.shift || "",
      join_date: userData?.join_date || "",
      department: userData?.department || "",
      company_role: userData?.company_role || "",
      qualification: userData?.qualification || "",
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
      gender: yup.string().required("Gender is required"),
      qualification: yup.string().required("Qualification is required"),
      company_role: yup.string().oneOf(["Admin", "Employee"]).required("Role is required"),
      // For Admin: dob, employee_id, join_date, department, shift are NOT required
      // These fields remain optional (won't be validated for admins)
      dob: yup.string().optional(),
      join_date: yup.string().optional(),
      department: yup.string().optional(),
      employee_id: yup.string().optional(),
      shift: yup.mixed().optional(),
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
        // For Admin, exclude employee-only fields from payload
        const payload = {
          name: values.name,
          email: values.email,
          number: values.number,
          gender: values.gender,
          qualification: values.qualification,
          company_role: values.company_role,
        };

        // Build address object if any address fields are set
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

        if (Object.keys(address).length > 0) {
          payload.Address = address;
        }

        const response = await dispatch(user_edit(payload)).unwrap();
        dispatch(clearError());
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } catch (error) {
        toast.error(error?.message || "Failed to update profile");
        console.log(error);
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formdata = new FormData();
    // append under both names for compatibility with backend
    appendImageToFormData(formdata, file);
    dispatch(user_edit(formdata));
  };


  const handleEditImage = () => fileInputRef.current.click();

  const send_otp = async () => {
    try {
      const response = await dispatch(otp_sending(phoneNumber)).unwrap();
      if (response) {
        setTimer(30);
        const countdown = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(countdown);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        setShowOtpInput(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyotp = async () => {
    try {
      const response = await dispatch(otp_verify(otp)).unwrap();
      if (response.message === "success") {
        seterrorotp("");
        setShowNewPasswordInputs(true);
      }
    } catch (error) {
      seterrorotp("OTP does not match");
    }
  };

  const changepassword = async () => {
    if (newPassword === confirmNewPassword) {
      try {
        await dispatch(changge_password(newPassword)).unwrap();
        toast.success("Password changed successfully!");
        setShowForgotPassword(false);
        setShowNewPasswordInputs(false);
        setNewPassword("");
        setConfirmNewPassword("");
        seterrorotp("");
      } catch (error) {
        console.log(error);
      }
    } else {
      seterrorotp("Passwords do not match");
    }
  };

  const logout = () => {
    MySwal.fire({
      title: "Confirm Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2563EB",
      cancelButtonColor: "#6B7280",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(user_logout()).unwrap();
          console.log("hello");
          
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
<>
  <ToastContainer />
  <div className="ml-64 min-h-screen bg-gray-100 pt-24 px-4 md:px-20">
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Profile Header */}
      <div className="relative h-48 bg-gradient-to-r from-blue-800 to-blue-600">
        <img
          src="https://source.unsplash.com/random/1200x300?office"
          alt="cover"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 opacity-80"></div>
        <div className="relative z-10 flex items-center gap-6 p-6">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden relative bg-gray-100">
              { (userData?.img || userData?.avatar || userData?.logo) ? (
                <img
                  src={getProfileImage(userData)}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  {/* human profile SVG icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 21a6.5 6.5 0 00-13 0" />
                  </svg>
                </div>
              )}
              <button
                onClick={handleEditImage}
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow hover:bg-gray-200"
                aria-label="Edit profile image"
              >
                <CameraIcon className="w-5 h-5 text-gray-700" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
            </div>
          <div className="text-white">
            <h1 className="text-3xl font-bold">
              {userData?.name || "Loading..."}
            </h1>
            <p className="text-blue-200">
              {userData?.department || userData?.company_role}
            </p>
            <p className="text-blue-100 text-sm">
              Employee ID: {userData?.employee_id || "-"} | Joined:{" "}
              {userData?.join_date || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Admin-required fields */}
        {[
          { label: "Full Name", name: "name" },
          { label: "Email", name: "email" },
          { label: "Phone", name: "number" },
          { label: "Gender", name: "gender" },
          { label: "Qualification", name: "qualification" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              {field.label}
            </label>
            {isEditing ? (
              <>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formik.values[field.name] || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched[field.name] && formik.errors[field.name] && (
                  <p className="text-red-600 text-sm mt-1">{formik.errors[field.name]}</p>
                )}
              </>
            ) : (
              <p className="font-medium text-gray-900">{formik.values[field.name] || "-"}</p>
            )}
          </div>
        ))}

        {/* Address fields (optional for all) */}
        {isEditing && (
          <>
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Address (Optional)</h3>
            </div>
            {[
              { label: "Place", name: "address_place" },
              { label: "District", name: "address_distct" },
              { label: "State", name: "address_state" },
              { label: "PIN Code", name: "address_pin" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  {field.label}
                </label>
                <input
                  type={field.name === "address_pin" ? "number" : "text"}
                  name={field.name}
                  value={formik.values[field.name] || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched[field.name] && formik.errors[field.name] && (
                  <p className="text-red-600 text-sm mt-1">{formik.errors[field.name]}</p>
                )}
              </div>
            ))}
          </>
        )}
      </form>

      {/* Buttons */}
      <div className="p-6 border-t flex gap-4">
        {isEditing ? (
          <>
            <button
              type="submit"
              onClick={() => formik.handleSubmit()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                formik.resetForm();
              }}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Password Reset */}
      {showForgotPassword && (
        <div className="p-6 border-t">
          {!showOtpInput && (
            <>
              <input
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border-b py-1 focus:outline-none focus:border-blue-500 mb-2"
              />
              <button
                type="button"
                onClick={send_otp}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                disabled={otp_loading || timer > 0}
              >
                {timer > 0 ? `Resend OTP in ${timer}s` : "Send OTP"}
              </button>
            </>
          )}

          {showOtpInput && !showNewPasswordInputs && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border-b py-1 focus:outline-none focus:border-blue-500 mb-2"
              />
              <button
                type="button"
                onClick={verifyotp}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-2"
              >
                Verify OTP
              </button>
              {errorotp && <p className="text-red-500">{errorotp}</p>}
            </>
          )}

          {showNewPasswordInputs && (
            <>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border-b py-1 focus:outline-none focus:border-blue-500 mb-2"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full border-b py-1 focus:outline-none focus:border-blue-500 mb-2"
              />
              <button
                type="button"
                onClick={changepassword}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Change Password
              </button>
              {errorotp && <p className="text-red-500">{errorotp}</p>}
            </>
          )}
        </div>
      )}

    

      {/* Logout */}
      <div className="p-6  flex ">
        <button
          type="button"
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</>


  );
};

export default UserProfile;
