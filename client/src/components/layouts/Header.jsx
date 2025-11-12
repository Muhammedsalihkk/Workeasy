import React from 'react';
import { useSelector } from 'react-redux';
import { getProfileImage } from '../../utils/imageUtil';

function Header() {
  const { owner_profile_response: user } = useSelector(
    (state) => state.user_profile
  );

  return (
    <header className="flex justify-end items-center h-15  shadow-md bg-gray-100  ">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
          <img
            src={getProfileImage(user)}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="font-semibold">
            {user ? user.admin_name || user.name : "loading..."}
          </div>
          <div className="text-sm text-gray-500">{user?.role}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
