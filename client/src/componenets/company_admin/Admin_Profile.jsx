import React, { useEffect, useRef, useState } from 'react';
import { FiUser, FiMail, FiPhone, FiLock, FiEdit, FiSave, FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Owner_profile_get } from '../Redux/Slice/Owner_slices/Profile';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { clearerror, Owner_edit } from '../Redux/Slice/Owner_slices/Edit';
import { changge_password, otp_sending, otp_verify } from '../Redux/Slice/Owner_slices/Password';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import 'animate.css';
import withReactContent from 'sweetalert2-react-content';
import { owner_logout } from '../Redux/Slice/Owner_slices/Logout';
import { useLocation, useNavigate } from 'react-router-dom';
import { employee_profile_get } from '../Redux/Slice/Employee/Profile';


const AdminProfile = ({ message }) => {
  const MySwal = withReactContent(Swal);
  const [isEditing, setIsEditing] = useState(false);
  const { owner_profile_response, loading, error } = useSelector((state) => state.owner_profile);
  const { Editloading, Editerror, owner_Edit_response } = useSelector((state) => state.owner_edit)
  const [userData, setuserData] = useState();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPasswordInputs, setShowNewPasswordInputs] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errorotp, seterrorotp] = useState()
  const [activities, setactivities] = useState([""])
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(0);
  const { otp_loading } = useSelector(state => state.otp_sending);
  const { verify_loading } = useSelector(state => state.otp_verify);
  const { change_loading } = useSelector(state => state.password_change);
  console.log(message);
  
  const { setlogout, role } = message
  console.log(role);


  const fileInputRef = useRef()
  useEffect(() => {
    const getuser = async () => {
      try {
        if (role == "employee") {
          const response = await dispatch(employee_profile_get()).unwrap()
          console.log(response.response);

          setuserData(response.response)

        }
        else {
          const response = await dispatch(Owner_profile_get()).unwrap()
          console.log(response);

          setuserData(response.data)
          setactivities(response.activity)
        }
      }
      catch (error) {
        console.log(error);

      }
    }
    getuser()
  }, [isEditing]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      admin_name: userData?.admin_name || "",
      email: userData?.email || "",
      number: userData?.number || "",
    },
    validationSchema: yup.object({
      admin_name: yup.string().required("Name is required"),
      email: yup.string().email("Enter valid email").required("Email is required"),
      number: yup.string().required("Phone number required").matches(/^[0-9]{10}$/, "Enter valid 10 digit phone number"),
    }),
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        const responseAction = await dispatch(Owner_edit(values)).unwrap()
        dispatch(clearerror())
        setIsEditing(false)

      } catch (error) {
        console.log(error);
      }

    }
  }
  )
  const send_otp = async () => {
    try {
      const response = await dispatch(otp_sending(phoneNumber)).unwrap()
      if (response) {
        setTimer(30)
        const countdown = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer <= 1) {
              clearInterval(countdown);
              return 0;
            }
            return prevTimer - 1;
          });
        }, 1000);
        setShowOtpInput(true);
      }
    }
    catch (error) {
      console.log(error);

    }
  }
  const verifyotp = async () => {
    try {
      const response = await dispatch(otp_verify(otp)).unwrap()
      if (response.message == "success") {
        seterrorotp("")
        setShowNewPasswordInputs(true);
      }
    }
    catch (error) {
      seterrorotp("otp does not matches")
      console.log(error);

    }
  }
  const handleImageChange = (e) => {
    const formdata = new FormData()
    formdata.append('images', e.target.files[0])
    dispatch(Owner_edit(formdata))

  }
  const handleEditImage = () => {
    fileInputRef.current.click();
  };
  const changepassword = async () => {
    if (newPassword == confirmNewPassword) {
      try {
        const response = await dispatch(changge_password(newPassword)).unwrap()
        toast.success("Password Changed Successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        seterrorotp("")
        setShowForgotPassword(false)
        setConfirmNewPassword(false)
      }
      catch (error) {
        console.log("error");
      }
    }
    else {
      seterrorotp("password not matches")
    }
  }
  const navigate=useNavigate("")
  const logout = () => {
    MySwal.fire({
      title: 'Confirm Logout',
      text: "Are you sure you want to logout from your account?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '<i class="fas fa-sign-out-alt"></i> Logout',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#2563EB', // Tailwind blue-600
      cancelButtonColor: '#6B7280', // Tailwind gray-500
      reverseButtons: true,
      focusCancel: true,
      background: '#f9fafb',
      customClass: {
        title: 'text-lg font-semibold',
        confirmButton: 'px-4 py-2',
        cancelButton: 'px-4 py-2',
        popup: 'rounded-xl'
      },
      buttonsStyling: false,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: 'Logged Out',
          text: 'You have been logged out successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#22c55e', // Tailwind green-500
          background: '#f9fafb',
          customClass: {
            title: 'text-lg font-semibold',
            confirmButton: 'px-4 py-2',
            popup: 'rounded-5xl'
          },
          buttonsStyling: false
        });
        try {
          const response = await dispatch(owner_logout()).unwrap()
        }
        catch (error) {
          setlogout('logout')
        }
      }
    });
  }
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen w-full bg-gray-50 pt-20">
        <div className="px-4 md:mx-30">
          <div className="bg-white rounded-xl  shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="relative h-48 bg-gradient-to-r from-blue-800 to-blue-600">
              <img
                src="https://source.unsplash.com/random/1200x300?office"
                alt="cover"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 opacity-80"></div>
              <div className="relative z-10 p-6 flex items-center gap-4">
                <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden relative">
                  {userData?.img ? (
                    <img
                      src={`${userData?.img}`}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src="https://img.freepik.com/premium-vector/vector-flat-illustration-black-color-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-838.jpg"
                      alt="Default Logo"
                      className="w-full h-full object-cover opacity-50"
                    />
                  )}

                  {/* Edit button overlay */}
                  <button
                    onClick={handleEditImage}
                    className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow hover:bg-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 text-gray-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L7.5 19.125H4.5v-3L16.862 4.487z"
                      />
                    </svg>
                  </button>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                <div>
                  <h1 className="text-white text-2xl font-bold">{userData ? (userData.admin_name || userData.name) : "loading.."}</h1>
                  <p className="text-blue-100">{userData ? (userData.department || userData.role) : "loading.."}</p>
                </div>
              </div>

            </div>

            {/* Profile Content */}
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    {/* Name */}
                    <div className="flex items-start">
                      <FiUser className="mt-1 text-gray-500 mr-3" />
                      <div className="flex-1">
                        <label className="block text-sm text-gray-500">Full Name</label>
                        {isEditing ? (
                          <>
                            <input
                              type="text"
                              name="admin_name"
                              value={formik.values.admin_name}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className="w-full border-b py-1 focus:outline-none focus:border-blue-500"
                            />
                            {formik.touched.admin_name && formik.errors.admin_name && (
                              <p className="text-red-600">{formik.errors.admin_name}</p>
                            )}
                          </>
                        ) : (
                          <p className="font-medium">{userData ? (userData.admin_name || userData.name) : "loading.."}</p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start">
                      <FiMail className="mt-1 text-gray-500 mr-3" />
                      <div className="flex-1">
                        <label className="block text-sm text-gray-500">Email</label>
                        {isEditing ? (
                          <>
                            <input
                              type="email"
                              name="email"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className="w-full border-b py-1 focus:outline-none focus:border-blue-500"
                            />
                            {formik.touched.email && formik.errors.email && (
                              <p className="text-red-600">{formik.errors.email}</p>
                            )}
                          </>
                        ) : (
                          <p className="font-medium">{userData?.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start">
                      <FiPhone className="mt-1 text-gray-500 mr-3" />
                      <div className="flex-1">
                        <label className="block text-sm text-gray-500">Phone</label>
                        {isEditing ? (
                          <>
                            <input
                              type="text"
                              name="number"
                              value={formik.values.number}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className="w-full border-b py-1 focus:outline-none focus:border-blue-500"
                            />
                            {formik.touched.number && formik.errors.number && (
                              <p className="text-red-600">{formik.errors.number}</p>
                            )}
                          </>
                        ) : (
                          <p className="font-medium">{userData?.number}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {isEditing && Editerror && <p className='text-red-700 m-4'>{Editerror.message}</p>}
                  <div className=' flex justify-end items-center gap-10'>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 mt-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    )}
                    {isEditing && (
                      <button
                        type="submit"
                        disabled={!(formik.isValid && formik.dirty)}
                        className={`mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ${!(formik.isValid && formik.dirty) ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                      >
                        {Editloading ? "Saving..." : "Save Changes"}
                      </button>
                    )}
                  </div>
                </div>


                {userData?.role == "companyadmin" ? <div>
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Account Security</h2>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center">
                            <FiLock className="text-gray-500 mr-3" />
                            <div>
                              <h3 className="font-medium">Password</h3>
                              <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                            </div>
                          </div>

                          <div className="mt-3 flex flex-col space-y-2">
                            <button
                              type="button"
                              onClick={() => {
                                setShowForgotPassword(!showForgotPassword);
                                setShowChangePassword(false);
                                setShowOtpInput(false);
                              }}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium text-left"
                            >
                              {showForgotPassword ? "Cancel" : "Forgot Password?"}
                            </button>
                          </div>
                          {showForgotPassword && (
                            <div className="mt-4 space-y-4">
                              {showForgotPassword && (
                                <div className="mt-4 space-y-4">
                                  {!showOtpInput && !showNewPasswordInputs && (
                                    <>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">Enter Email</label>
                                        <input
                                          type="text"
                                          name="phoneNumber"
                                          value={phoneNumber}
                                          onChange={(e) => setPhoneNumber(e.target.value)}
                                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => {

                                          send_otp()
                                        }}
                                        disabled={otp_loading}
                                        className={`w-full py-2 rounded-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
                                      >
                                        {otp_loading ? "Sending..." : "Send OTP"}
                                      </button>
                                    </>
                                  )}

                                  {showOtpInput && !showNewPasswordInputs && (
                                    <>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                                        <input
                                          type="text"
                                          name="otp"
                                          value={otp}
                                          onChange={(e) => setOtp(e.target.value)}
                                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                      </div>

                                      <div className="text-sm text-gray-600 flex">
                                        {timer > 0 && <p>Resend available in {timer} seconds</p>}
                                        {timer == 0 && (
                                          <button
                                            onClick={() => {

                                              send_otp()
                                            }}
                                            disabled={otp_loading}
                                            className="text-red-600 ml-2"
                                          >
                                            {otp_loading ? "Resending..." : "Resend"}
                                          </button>
                                        )}
                                      </div>

                                      {errorotp && <p className='text-red-700 ml-15'>{errorotp}</p>}
                                      <button
                                        type="button"
                                        onClick={() => {

                                          verifyotp()
                                        }}
                                        disabled={verify_loading}
                                        className={`w-full py-2 rounded-md ${verify_loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                                      >
                                        {verify_loading ? "Verifying..." : "Verify OTP"}
                                      </button>
                                    </>
                                  )}

                                  {showNewPasswordInputs && (
                                    <>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                                        <input
                                          type="password"
                                          name="newPassword"
                                          value={newPassword}
                                          onChange={(e) => setNewPassword(e.target.value)}
                                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                        <input
                                          type="password"
                                          name="confirmNewPassword"
                                          value={confirmNewPassword}
                                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                      </div>
                                      {errorotp && <p className='text-red-600 ml-15'>{errorotp}</p>}
                                      <button
                                        type="button"
                                        onClick={() => {

                                          changepassword()
                                        }}
                                        disabled={change_loading}
                                        className={`w-full py-2 rounded-md ${change_loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
                                      >
                                        {change_loading ? "Updating..." : "Update Password"}
                                      </button>
                                    </>
                                  )}
                                </div>
                              )}

                              {showChangePassword && (
                                <form className="mt-4 space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                    <input
                                      type="password"
                                      name="currentPassword"
                                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                                    <input
                                      type="password"
                                      name="newPassword"
                                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                    <input
                                      type="password"
                                      name="confirmNewPassword"
                                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                  </div>
                                  <button
                                    type="submit"
                                    disabled={change_loading}
                                    onClick={(e) => {

                                    }}
                                    className={`w-full py-2 rounded-md ${change_loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                                  >
                                    {change_loading ? "Updating..." : "Update Password"}
                                  </button>
                                </form>
                              )}

                            </div>
                          )}

                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="mt-6 h-25 overflow-y-scroll ">
                    <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                    <ul className=" ">
                      {activities && activities.length != 0 && activities.map((item, i) => (
                        <li key={i} className="flex justify-between text-gray-700">
                          <span>{item.activity}</span>
                          <span className="text-sm text-gray-500">
                            {item.date} | {item.time}
                          </span>
                        </li>
                      ))}
                      {activities && activities.length === 0 && (
                        <li className="text-gray-500">No recent activities found.</li>
                      )}
                    </ul>
                  </div>

                </div> : <div className="space-y-5 mt-10">


                  <div className="flex items-start">
                    <FiLock className="mt-1 text-gray-500 mr-3" /> {/* Lock icon for status */}
                    <div className="flex-1">
                      <label className="block text-sm text-gray-500">Status</label>
                      <p className="font-medium text-green-600">{userData?.status}</p> {/* Status in green */}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiUser className="mt-1 text-gray-500 mr-3" /> {/* User icon for position */}
                    <div className="flex-1">
                      <label className="block text-sm text-gray-500">Position</label>
                      <p className="font-medium">{userData?.company_role}</p>
                    </div>
                  </div>


                  <div className="flex items-start">
                    <FiMail className="mt-1 text-gray-500 mr-3" /> {/* Mail icon for qualification */}
                    <div className="flex-1">
                      <label className="block text-sm text-gray-500">Qualification</label>
                      <p className="font-medium">{userData?.qualification}</p>
                    </div>
                  </div>

                </div>}


              </div>
            </form>

            {/* Action Buttons */}
            <div className="border-t px-6 py-4 bg-gray-50 flex justify-between space-x-3">
              <button
                onClick={() => logout()}
                className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-sm transition duration-200">
                <FiLogOut className="mr-2 text-xl" />
                Logout
              </button>
              <div className="flex gap-10">

                {userData?.role == "companyadmin" && !isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>

  );
};

export default AdminProfile;
