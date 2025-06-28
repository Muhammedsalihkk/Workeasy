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
        
          completed
        </button>
        </div>
    </form>
    )
}

export default Admin_step