import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Navbar() {
    const [isOpen,setIsOpen]=useState(false)
    const  navigate=useNavigate('')
  return (
    <div>
          <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 transition-all duration-300 hover:shadow-md">
    <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-2xl font-extrabold text-orange-700 tracking-wide flex items-center">
          
            <img src="https://d3bql97l1ytoxn.cloudfront.net/app_resources/422275/thumbs_112/img6234590148314030139-2x.png" className='w-18' alt="" />

          Workeasy
        </div>
      </div>

      {/* Desktop Menu - Improved hover effects */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="#home" className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200">Home</a>
        <a href="#features" className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200">Features</a>
        <a href="#testimonials" className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200">Testimonials</a>
        <a href="#contact" className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200">Contact</a>
        
        <div className="flex items-center space-x-4 ml-4">
          <Link to='/login' className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200">Login</Link>
        <Link to='/registration' className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-sm hover:shadow-md">
            Registration
          </Link>
        </div>
      </div>

      {/* Mobile Menu Button - Better icon */}
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </div>

    {/* Mobile Menu - Better animation */}
    <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
      <div className="px-6 py-4 bg-white space-y-3">
        <a href="#home" onClick={()=>setIsOpen(!isOpen)} className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">Home</a>
        <a href="#features"  onClick={()=>setIsOpen(!isOpen)} className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">Features</a>
        <a href="#testimonials"  onClick={()=>setIsOpen(!isOpen)} className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">Testimonials</a>
        <a href="#contact"  onClick={()=>setIsOpen(!isOpen)} className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">Contact</a>
        <div className="pt-2 space-y-3 border-t border-gray-100">
          <a href="#login" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">Login</a>
          <a href="#signup" className="block py-2 text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
            Company Registration
          </a>
        </div>
      </div>
    </div>
  </nav>
    </div>
  )
}
