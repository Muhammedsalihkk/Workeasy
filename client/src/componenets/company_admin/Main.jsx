import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux';
import { Owner_profile_get } from '../Redux/Slice/Owner_slices/Profile';
import { Cookie } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationsView from './Notifications';
import { employee_profile_get } from '../Redux/Slice/Employee/Profile';
import CompanyProfile from './Company_Profile';
import EmployeeDetails from './Admin/Employees';
import AdminProfile from './Admin_Profile';
import AnalyticsDashboard from './Admin/Analysis';
import AdminDashboard from './Admin/Dashboard';
import EmployeeDashboard from './Employee/DashbordEmp';


function Comapany_ui() {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const {loading,error,owner_profile_response}=useSelector((state)=>state.owner_profile)
  const [logout,setlogout]=useState("")
  const dispatch=useDispatch()
  const [user, setuser] = useState()
  const navigate=useNavigate()
    const location=useLocation()
    const {role}=location.state||""
  useEffect(()=>{
    const getuser=async()=>{
      try{
        console.log(role);
        
        if(role=="admin"){
          const response=await dispatch(Owner_profile_get()).unwrap()
          console.log("respos",response.data);
          
        setuser(response.data)
        }
        else{
          const response=await dispatch(employee_profile_get()).unwrap() 
          console.log(response.response);       
          setuser(response.response)
        }
      }catch(error){
        if(error.message=="un authrized"){
          navigate('/login')
        } 
        console.log("error",error);
        
      }
    }
    getuser()
  },[logout,role,activeItem])

  return (
    <>
    <ToastContainer/>
      <div className='flex'>
        <Sidebar message={{ activeItem, setActiveItem,role }} />
        {activeItem == "Dashboard" && role=="admin"&&<AdminDashboard message={{ activeItem, setActiveItem,user }} />}
        {activeItem=="Dashboard"&&role=="employee"&&<EmployeeDashboard/>}
        {activeItem == "CompanyProfile" && <CompanyProfile  />}
        {activeItem == "Employees" && <EmployeeDetails />}
        {activeItem == "Admin profile" && <AdminProfile message={{setlogout,role}} />}
        {activeItem == "Analytics" && <AnalyticsDashboard message={{user}}/>}
        {activeItem == "Notification" && <NotificationsView/>}


      </div>


    </>
  )
}

export default Comapany_ui