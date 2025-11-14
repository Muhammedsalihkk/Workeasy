import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileImage } from '../../utils/imageUtil';
import { user_profile_get } from '../../store/slices/Slice/userSlice/userProfile';

function Header() {
  const [userData,Setuserdata]=useState(null)
  const { user_profile_response: user } = useSelector(
    (state) => state.user_profile
  );
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(user_profile_get())
    Setuserdata(user.data)
  }, [])
  


  return (
    <header className="flex justify-end items-center h-15  shadow-md bg-gray-100  ">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
          <img
            src={getProfileImage(userData)}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="font-semibold">
            {user ? user.admin_name || userData?.name : "loading..."}
          </div>
          <div className="text-sm text-gray-500">{userData?.company_role}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
