import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard';
import CompanyProfile from './Company_Profile';
import EmployeeDetails from './Employees';
import AdminProfile from './Admin_Profile';
import AnalyticsDashboard from './Analysis';
import NotificationsView from './Notifications';


function Comapany_ui() {
  const [activeItem, setActiveItem] = useState('Dashboard');
  return (
    <>
       <div className='flex'>
         <Sidebar message={{activeItem,setActiveItem}}/>
        {activeItem=="Dashboard"&&<Dashboard message={{activeItem,setActiveItem}}/>}
        {activeItem=="CompanyProfile"&&<CompanyProfile/>}
        {activeItem=="Employees"&&<EmployeeDetails/>}
        {activeItem=="Admin profile"&&<AdminProfile/>}
        {activeItem=="Analytics"&&<AnalyticsDashboard/>}
        {activeItem=="Notification"&&<NotificationsView/>}
      

       </div>


    </>
  )
}

export default Comapany_ui