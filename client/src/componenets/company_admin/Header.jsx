import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Owner_profile_get } from '../Redux/Slice/Owner_slices/Profile';
import { useState } from 'react';

function Header({ message }) {

  const { owner_profile_response, loading, error } = useSelector((state) => state.owner_profile)
  const dispatch = useDispatch()
  console.log(message);
  const { header,user } = message
  console.log("user is",user);
  
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-white shadow-md">
      <div className="mb-4 md:mb-0 font-bold text-2xl ">
        {header}
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
            {user?.img ? (<img
              src={`${user?.img}`}
              alt="profile"
              className="w-full h-full object-cover"
            />) : <img
              src="https://img.freepik.com/premium-vector/vector-flat-illustration-black-color-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-838.jpg" // replace with your default image path
              alt="Default Logo"
              className="w-full h-full opacity-50"
            />}
          </div>
          <div>
            <div className="font-semibold">{user ?( user.admin_name||user.name):"loading.." }</div>
            <div className="text-sm text-gray-500">{user?.role}</div>
          </div>
        </div>
      </div>

    </header>
  )



}

export default Header