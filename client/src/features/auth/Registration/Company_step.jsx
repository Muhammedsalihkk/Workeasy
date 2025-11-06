import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { register_company } from '../../../store/slices/Slice/Company_slice/Register_company'


function Company_step({ step_setting }) {

  const { registration_response, loading, error } = useSelector((state) => state.company_add)
  const [err, setterror] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {
    if (registration_response) {
      setCurrentStep(registration_response.status)
      setcomapany_id(registration_response.message)
    }
    else if (error) {
      console.log("eror", error);
      setterror(error.message)
    }
  }, [registration_response, error])

  const { currentStep, setCurrentStep, setcomapany_id } = step_setting
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
        {<p className='text-red-600 '>{err && err}</p>}
      </div>
      <div className='flex justify-end'>
        <button type="submit"
          disabled={!(formik.isValid && formik.dirty)}
          className={`px-4 py-2 rounded-md w-30 text-white transition-colors duration-300 
              ${!(formik.isValid && formik.dirty)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"}`}>
          {!loading ? ("Next") : (
            <>
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
          </svg>
           
            </>)}
        </button>
      </div>
    </form>

  )
}

export default Company_step