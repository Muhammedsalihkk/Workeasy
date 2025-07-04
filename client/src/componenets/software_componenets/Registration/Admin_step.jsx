import { useFormik } from 'formik'
import * as yup from 'yup'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { add_owner } from '../../Redux/Slice/Owner_slices/Register'

function Admin_step({step_setting}) {
    const {currentStep,setCurrentStep,company_id}=step_setting
    const [complete,setcomplete]=useState(false)
    const {owner_response_data,loading,error}=useSelector((state)=>state.owner_add)
    const dispatch=useDispatch()
   useEffect(()=>{
    if(owner_response_data)
    {
        setCurrentStep("completed")  
    }
    if(error)
    {
        setCurrentStep("admin")
    }  
   },[owner_response_data,error])
    const formik=useFormik({
        initialValues:{
            admin_name:"",
            email:"",
            number:"",
            confirm_password:"",
            password:"",
        },
        validationSchema:yup.object({
            admin_name:yup.string().required("name is requird"),
            email:yup.string().email('enter valid email').required("email requird"),
            number:yup.string().required("phonenumber required").matches(/^[0-9]{10}$/,"enter the valid phonenumber"),
            password:yup.string().required("password required"),
            confirm_password:yup.string().required("confirmpassword required").oneOf([yup.ref('password'),null],"password must match ")
        }),
        validateOnMount:true,
        onSubmit:(value)=>{
            value.company_id=company_id
            console.log("values",value);
            
            dispatch(add_owner(value))
            
        }
    })
    return (
        <form onSubmit={formik.handleSubmit} className={`space-y-4 grid grid-cols-1 gap-5 transition-transform duration-500 ease-in-out transform`}>
           <div className='grid gap-3.5'>
             <h2 className="text-xl font-semibold text-gray-800 pt-4">Admin Information</h2>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Name*</label>
                <input
                    type="text"
                    name="admin_name"
                    value={formik.values.admin_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
                {formik.touched.admin_name&&formik.errors.admin_name&&( <p className='text-red-600'>{formik.errors.admin_name}</p> )}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    
                />
                {formik.touched.email&&formik.errors.email&&( <p className='text-red-600'>{formik.errors.email}</p> )}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                <input
                    type="text"
                    name="number"
                    value={formik.values.number}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    
                />
                {formik.touched.number&&formik.errors.number&&(<p className='text-red-600'>{formik.errors.number}</p> )}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    
                />
                {formik.touched.password&&formik.errors.password&&( <p className='text-red-600'>{formik.errors.password}</p> )}
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">confirmpassword*</label>
                <input
                    value={formik.values.confirmpassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    name="confirm_password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {formik.touched.confirm_password&&formik.errors.confirm_password&&( <p className='text-red-600'>{formik.errors.confirm_password}</p> )}
            </div>
           </div>
          <div className='flex justify-end'>
            
             <button type="submit" className={` px-4 py-2 bg-blue-500 w-30 text-white rounded-md 
              ${!(formik.dirty&&formik.isValid)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"}`}
              >
        
          {!loading?"Completed":  <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
          </svg>}
        </button>
        </div>
    </form>
    )
}

export default Admin_step