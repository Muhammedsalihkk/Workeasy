import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiLock, FiCalendar, FiMapPin, FiEdit, FiSave, FiLogOut } from 'react-icons/fi';


const AdminProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [adminData, setAdminData] = useState({
        name: "Alex Morgan",
        email: "alex@company.com",
        phone: "+1 (555) 123-4567",
        role: "Company Admin",
        joinDate: "Jan 15, 2022",
        location: "San Francisco, CA",
        bio: "Senior administrator with full system privileges. Responsible for user management and system configuration."
    });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminData({ ...adminData, [name]: value });
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 pt-20  ">
            <div className="px-4 md:mx-30">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-6">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden mb-4 md:mb-0">
                                    <img
                                        src="https://thumbs.dreamstime.com/b/profile-picture-smiling-indian-female-employee-profile-picture-smiling-millennial-indian-female-employee-posing-office-198022033.jpg"
                                        alt=""
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <button
                                    className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-md"
                                    onClick={handleEditToggle}
                                >
                                    {isEditing ? (
                                        <FiSave className="text-indigo-700" />
                                    ) : (
                                        <FiEdit className="text-indigo-700" />
                                    )}
                                </button>
                            </div>

                            <div className="md:ml-6 text-center md:text-left">
                                <h1 className="text-2xl font-bold text-white">{adminData.name}</h1>
                                <div className="mt-2 bg-indigo-800 text-indigo-100 px-3 py-1 rounded-full text-sm inline-block">
                                    {adminData.role}
                                </div>
                                <p className="mt-3 text-indigo-200">{adminData.bio}</p>
                            </div>
                        </div>
                    </div>


                    {/* Profile Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                        {/* Personal Info Section */}
                        <div className="md:col-span-2">
                            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <FiUser className="mt-1 text-gray-500 mr-3" />
                                    <div className="flex-1">
                                        <label className="block text-sm text-gray-500">Full Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={adminData.name}
                                                onChange={handleInputChange}
                                                className="w-full border-b py-1 focus:outline-none focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="font-medium">{adminData.name}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <FiMail className="mt-1 text-gray-500 mr-3" />
                                    <div className="flex-1">
                                        <label className="block text-sm text-gray-500">Email</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={adminData.email}
                                                onChange={handleInputChange}
                                                className="w-full border-b py-1 focus:outline-none focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="font-medium">{adminData.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <FiPhone className="mt-1 text-gray-500 mr-3" />
                                    <div className="flex-1">
                                        <label className="block text-sm text-gray-500">Phone</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="phone"
                                                value={adminData.phone}
                                                onChange={handleInputChange}
                                                className="w-full border-b py-1 focus:outline-none focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="font-medium">{adminData.phone}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <FiMapPin className="mt-1 text-gray-500 mr-3" />
                                    <div className="flex-1">
                                        <label className="block text-sm text-gray-500">Location</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="location"
                                                value={adminData.location}
                                                onChange={handleInputChange}
                                                className="w-full border-b py-1 focus:outline-none focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="font-medium">{adminData.location}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <FiCalendar className="mt-1 text-gray-500 mr-3" />
                                    <div className="flex-1">
                                        <label className="block text-sm text-gray-500">Joined On</label>
                                        <p className="font-medium">{adminData.joinDate}</p>
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* Account Section */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Account Security</h2>
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <FiLock className="text-gray-500 mr-3" />
                                        <div>
                                            <h3 className="font-medium">Password</h3>
                                            <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                                        </div>
                                    </div>
                                    <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        Change Password
                                    </button>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-medium mb-2">Recent Activity</h3>
                                    <ul className="text-sm space-y-2">
                                        <li className="text-gray-600">• Logged in today at 08:45 AM</li>
                                        <li className="text-gray-600">• Updated profile yesterday</li>
                                        <li className="text-gray-600">• Changed password last week</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t px-6 py-4 bg-gray-50 flex justify-between space-x-3">
                        <div className="">
                            <button
                                // replace with your actual logout function
                                className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-sm transition duration-200"
                            >
                                <FiLogOut className="mr-2 text-xl" />
                                Logout
                            </button>
                        </div>
                        <div className='flex'>
                            {isEditing && <button onClick={() => setIsEditing(!isEditing)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                                Cancel
                            </button>}
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                onClick={handleEditToggle}
                            >
                                {isEditing ? "Save Changes" : "Edit Profile"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;