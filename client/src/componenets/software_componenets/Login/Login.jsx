import React, { useState } from 'react'
import Company_step from '../Registration/Company_step';
import Admin_step from '../Registration/Admin_step';
import Paymenet from '../Registration/Paymenet';
import Subscription_step from '../Registration/Subscription_step';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [role,setRole]=useState('')

  const navigate=useNavigate('')

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="mx-auto bg-gradient-to-r  text-white w-22 h-16 rounded-xl flex items-center justify-center mb-4" onClick={()=>navigate('/')}>
             <img src="https://d3bql97l1ytoxn.cloudfront.net/app_resources/422275/thumbs_112/img6234590148314030139-2x.png" className='w-25' alt="" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form  className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  
                  placeholder="you@company.com"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                 
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Login As
              </label>
              <div className="grid grid-cols-2 gap-4">
                {/* Employee Card */}
                <div 
                  className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${role === 'employee' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                  onClick={() => setRole('employee')}
                >
                  {role === 'employee' && (
                    <div className="absolute top-2 right-2 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" >
                      <img src="https://thumbs.dreamstime.com/b/modern-geometric-logo-features-construction-theme-flat-style-includes-worker-hammer-cityscape-using-primary-color-380028409.jpg" className='w-100' alt="" />
                      </div>
                    <span className="mt-3 font-medium text-gray-800">Employee</span>
                  </div>
                </div>

                {/* Admin Card */}
                <div 
                  className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${role === 'admin' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                  onClick={() => setRole('admin')}
                >
                  {role === 'admin' && (
                    <div className="absolute top-2 right-2 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div className="flex flex-col items-center">
                    <div className=" border-2 border-dashed rounded-xl w-16 h-16" >
                      <img src="https://media.istockphoto.com/id/628884910/vector/real-estate-developer-entrepreneur-concept.jpg?s=612x612&w=0&k=20&c=Cp83P0XqWrg9lgc-eO6JGdWJZEqTksWwgNqIHQErTCc=" className='w-15' alt="owner" />
                      </div>
                    
                    <span className="mt-3 font-medium text-gray-800">Company Admin</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                 
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        <div className="text-center mt-8 text-sm text-gray-600" onClick={()=>navigate('/registration')}>
          Don't have an account?
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Get started
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login