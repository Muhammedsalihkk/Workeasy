import React from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const { owner_profile_response: user } = useSelector(
    (state) => state.user_profile
  );

  return (
    <header className="flex justify-end items-center h-15  shadow-md bg-gray-100  ">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
          {user?.img ? (
            <img
              src={user.img}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="https://img.freepik.com/premium-vector/vector-flat-illustration-black-color-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-838.jpg"
              alt="Default Logo"
              className="w-full h-full opacity-50"
            />
          )}
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
