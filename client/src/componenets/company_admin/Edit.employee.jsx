import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiSave, FiX } from 'react-icons/fi';

const EditProfile = ({message}) => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", location: "", joinDate: "" });
    const [isEditing, setIsEditing] = useState(true);
    const {seteditprofile, editprofile }=message


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(adminData);
        setIsEditing(false);
    };

    return (
        <div className="fixed inset-0  bg-opacity-30 backdrop-blur-[5px] flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl w-full mx-4">
                <div className=" items-center justify-between mb-6 flex">
                    <h2 className="text-2xl font-bold text-gray-800">Profile </h2>
                    <button
                        onClick={()=>seteditprofile(false)}
                        className="  right-4 mb-10 text-gray-500 hover:text-gray-700 text-5xl font-bold"
                    >
                        &times;
                    </button>
                </div>

                {/* Your form content here */}
                <div className="space-y-6">
                    {/* Example field */}
                    <div className="flex items-center pb-3">
                        <FiUser className="text-gray-500 mr-4" />
                        <div className="flex-1">
                            <label className="block text-gray-600 text-sm">Full Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder='Enter your name'
                                    className="w-full mt-1 border-b focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-800 font-medium">{formData.name}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center pb-3">
                        <FiUser className="text-gray-500 mr-4" />
                        <div className="flex-1">
                            <label className="block text-gray-600 text-sm">Phone</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    placeholder='Enter your number'
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full mt-1 border-b focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-800 font-medium">{formData.name}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center pb-3">
                        <FiUser className="text-gray-500 mr-4" />
                        <div className="flex-1">
                            <label className="block text-gray-600 text-sm">Time Shift</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    placeholder='Enter your number'
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full mt-1 border-b focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-800 font-medium">{formData.name}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center pb-3">
                        <FiUser className="text-gray-500 mr-4" />
                        <div className="flex-1">
                            <label className="block text-gray-600 text-sm">Positoin</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    placeholder='Enter your number'
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full mt-1 border-b focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-800 font-medium">{formData.name}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center pb-3">
                        <FiUser className="text-gray-500 mr-4" />
                        <div className="flex-1">
                            <label className="block text-gray-600 text-sm">Basic Salary</label>
                            {isEditing ? (
                                <input
                                    type="number"
                                    name="name"
                                    placeholder='Enter your Salary'
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full mt-1 border-b focus:outline-none focus:border-blue-500"
                                />
                            ) : (
                                <p className="mt-1 text-gray-800 font-medium">{formData.name}</p>
                            )}
                        </div>
                    </div>
                    <div className='flex justify-end'> 
                        <button
                             type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none ">
                            Save Changes</button>
                    </div>
                    {/* Add other fields similarly */}
                </div>
            </div>
        </div>

    );
};

export default EditProfile;
