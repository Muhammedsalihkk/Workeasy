import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { register_company } from '../../Redux/Slice/Company_slice/Register_company'


function Company_step({ step_setting }) {

  const { registration_response, loading, error } = useSelector((state) => state.company_add) 
  const [err,setterror]=useState("")
  const dispatch = useDispatch()
  useEffect(()=>{
     if (registration_response) {  
            setCurrentStep(registration_response.status)
            setcomapany_id(registration_response.message)
        }
        else {
          console.log("eror",error);
            setterror(error.message)
        }
  },[registration_response,error])
  
  const { currentStep, setCurrentStep,setcomapany_id } = step_setting
  const [date, setdata] = useState()
  const formik = useFormik({
    initialValues: {
      legalname: "",
      date: "",
      tradingname: "",
      registration_number: "",
      GST_number: "",
      company_type: "",
      primary_industry: "",
      phonenumber: "",
      email: "",
    },
    validationSchema: yup.object({
      legalname: yup.string().required("legalname is required"),
      tradingname: yup.string().required("tradingname is required "),
      registration_number: yup.string().required("registration_number is required"),
      GST_number: yup.string().required("registration_number is required"),
      company_type: yup.string().oneOf(["LLC", "Corporation", "Partnership", "Sole Proprietorship"], "initialValues")
        .required("company type is required"),
      primary_industry: yup.string().required("primary_industry is required"),
      date: yup.string().required(),
      phonenumber: yup.string().matches(/^[0-9]{10}$/, "Please enter the valid phonenumber")
        .required("phonenumber is required"),
      email: yup.string().email().required("email is required")
    }),
    validateOnMount: true,
    onSubmit: ((values) => {
        dispatch(register_company(values))
    })
  })
  return (
    <form onSubmit={formik.handleSubmit} className={`space-y-4 w-300px transition-transform duration-500 ease-in-out grid gap-3 `}>
      <h2 className="text-xl font-semibold text-gray-800">Company Information</h2>
      <div className='grid grid-cols-2 gap-3'>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Legal Name*</label>
          <input
            type="text"
            name="legalname"
            onBlur={formik.handleBlur}
            value={formik.values.legalname}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"

          />
          {formik.touched.legalname && formik.errors.legalname && (<div className='text-red-600'>
            {formik.errors.legalname}
          </div>)}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trading Name*</label>
          <input
            type="text"
            name="tradingname"
            onBlur={formik.handleBlur}
            value={formik.values.tradingname}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"

          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number*</label>
          <input
            type="text"
            name="registration_number"
            onBlur={formik.handleBlur}
            value={formik.values.registration_number}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"

          />
          {formik.touched.registration_number && formik.errors.registration_number && (<div className='text-red-600'>
            {formik.errors.registration_number}
          </div>)}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GST Number*</label>
          <input
            type="text"
            value={formik.values.GST_number}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="GST_number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {formik.touched.GST_number && formik.errors.GST_number && (<div className='text-red-600'>
            {formik.errors.GST_number}
          </div>)}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Type*</label>
          <select
            name="company_type"
            value={formik.values.company_type}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"

          >
            <option value="">Select company type</option>
            <option value="LLC">LLC</option>
            <option value="Corporation">Corporation</option>
            <option value="Partnership">Partnership</option>
            <option value="Sole Proprietorship">Sole Proprietorship</option>
          </select>
          {formik.touched.company_type && formik.errors.company_type && (<div className='text-red-600'>
            {formik.errors.company_type}
          </div>)}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Industry*</label>
          <input
            type="text"
            name="primary_industry"
            onBlur={formik.handleBlur}
            value={formik.values.primary_industry}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"

          />
          {formik.touched.primary_industry && formik.errors.primary_industry && (<div className='text-red-600'>
            {formik.errors.primary_industry}
          </div>)}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company email*</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"

          />
          {formik.touched.email && formik.errors.email && (<div className='text-red-600'>
            {formik.errors.email}
          </div>)}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Phonenumber*</label>
          <input
            type="text"
            name="phonenumber"
            onBlur={formik.handleBlur}
            value={formik.values.phonenumber}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"

          />
          {formik.touched.phonenumber && formik.errors.phonenumber && (<div className='text-red-600'>
            {formik.errors.phonenumber}
          </div>)}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company registerd at*</label>
          <input
            type="date"
            name="date"
            value={formik.values.date}
            onBlur={formik.handleBlur}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={formik.handleChange}

          />
          {formik.touched.date && formik.errors.date && (<div className='text-red-600'>
            {formik.errors.date}
          </div>)}
        </div>
      </div>
        <div className='flex justify-center'>
          {<p className='text-red-600 '>{err&&err}</p> }
        </div>
      <div className='flex justify-end'>
        <button type="submit"
          disabled={!(formik.isValid && formik.dirty)}
          className={`px-4 py-2 rounded-md w-30 text-white transition-colors duration-300 
              ${!(formik.isValid && formik.dirty)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"}`}>
          Next
        </button>
      </div>
    </form>

  )
}

export default Company_step