import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../Redux/Slice/userSlice/Login';
import { useEffect } from 'react';

function Login() {
  const dispatch = useDispatch();
  const { login_response, loading, error } = useSelector((state) => state.login);
  const navigate = useNavigate('');
  const [err, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email required'),
      password: yup.string().required('Password required'),
    }),
    validateOnMount: true,
    onSubmit: async (value) => {
      try {
        setError('');
        const response = await dispatch(login(value)).unwrap();
        if (response.message === 'success') {
          toast.success('Login success', {
            position: 'top-right',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate('/dashboard');
        }
      } catch (error) {
        console.log('error');
        setError(error.error);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-3xl">
        {/* Left Side - Form */}
        <div className="p-8 flex items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="text-center mb-6">
              <div
                className="mx-auto cursor-pointer mb-4"
                onClick={() => navigate('/')}
              >
                <img
                  src="https://d3bql97l1ytoxn.cloudfront.net/app_resources/422275/thumbs_112/img6234590148314030139-2x.png"
                  className="w-20 mx-auto"
                  alt=""
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
              <p className="text-gray-600 mt-2 text-sm">Sign in to your account</p>
            </div>

            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  required
                  placeholder="you@company.com"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs">{formik.errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="••••••••"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs">{formik.errors.password}</p>
                )}
              </div>

              {/* Error */}
              <div className="flex justify-center">
                {err && <p className="text-red-600 text-xs">{err}</p>}
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className={`px-4 py-2 rounded-md w-full text-white text-sm transition-colors duration-300 ${
                    !(formik.isValid && formik.dirty)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {loading ? 'Loading...' : 'Sign in'}
                </button>
              </div>
            </form>

            <div
              className="text-center mt-6 text-xs text-gray-600"
              onClick={() => navigate('/registration')}
            >
              Don't have an account?
              <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                {' '}Get started
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block">
          <img
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="Side Visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
