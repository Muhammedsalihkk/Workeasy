import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
 
// Redux actions
import {
  otp_sending,
  otp_verify,
  changge_password,
} from "../../store/slices/Slice/userSlice/Password";
import { clearError, user_edit } from "../../store/slices/Slice/userSlice/Edit";
import { user_profile_get } from "../../store/slices/Slice/userSlice/Profile";
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
        .matches(/^[0-9]{10}$/, "Enter 10 digit number"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await dispatch(user_edit(values)).unwrap();
        dispatch(clearError());
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleImageChange = (e) => {
    const formdata = new FormData();
    formdata.append("images", e.target.files[0]);
    dispatch(user_edit(formdata));
  };
console.log(userData);

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
  <div className="min-h-screen bg-gray-100 pt-24 px-4 md:px-20">
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
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden relative">
            <img
              src={
                userData?.img ||
                "https://img.freepik.com/premium-vector/vector-flat-illustration-black-color-avatar-user-profile-person-icon.jpg"
              }
              alt="profile"
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleEditImage}
              className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow hover:bg-gray-200"
            >
              Edit
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
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
        {[
          { label: "Full Name", name: "name" },
          { label: "Email", name: "email" },
          { label: "Phone", name: "number" },
          { label: "Gender", name: "gender" },
          { label: "DOB", name: "dob", type: "date" },
          { label: "Shift", name: "shift" },
          { label: "Department", name: "department" },
          { label: "Role", name: "company_role" },
          { label: "Qualification", name: "qualification" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-gray-500 text-sm">{field.label}</label>
            {isEditing ? (
              <input
                type={field.type || "text"}
                name={field.name}
                value={formik.values[field.name] || ""}
                onChange={formik.handleChange}
                className="w-full border-b py-1 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <p className="font-medium">{formik.values[field.name]}</p>
            )}
          </div>
        ))}
      </form>

      {/* Buttons */}
      <div className="ml-10 flex justify-evenly">

        <div className="md:col-span-2 flex  gap-4 mt-4">
          {isEditing ? (
            <>
              <button
                type="submit"
                onClick={()=>formik.handleSubmit()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>
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
