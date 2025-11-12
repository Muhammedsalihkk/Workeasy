import React, { useEffect, useRef, useState } from 'react';
import {
    DocumentTextIcon,
    EyeIcon,
    EyeSlashIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/outline';
import {
    FaBuilding,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { company_Profile } from '../../store/slices/Slice/Company_slice/Profile';
import { edit_Company_Profile } from '../../store/slices/Slice/Company_slice/Edit';
import { getProfileImage, appendImageToFormData } from '../../utils/imageUtil';

const CompanyProfile = () => {
    const [showDocuments, setShowDocuments] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();

    const { Profile_response, loading, error } = useSelector((state) => state.company_profile);
    const { Editloading, edit_response } = useSelector((state) => state.company_edit);
    const [company, setCompany] = useState({});

    // ✅ Fetch profile once at start and whenever edited successfully
    useEffect(() => {
        dispatch(company_Profile());
    }, [dispatch, edit_response]);

    // ✅ Update local company state once profile data is fetched
    useEffect(() => {
        if (Profile_response && Profile_response.message) {
            setCompany(Profile_response.message);
        }
    }, [Profile_response]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            legalname: company?.legalname || '',
            primary_industry: company?.primary_industry || '',
            registration_number: company?.registration_number || '',
            tradingname: company?.tradingname || '',
            GST_number: company?.GST_number || '',
            phonenumber: company?.phonenumber || '',
            email: company?.email || '',
            address: company?.address || '',
        },
        validationSchema: yup.object({
            legalname: yup.string().required('Company legal name is required'),
            primary_industry: yup.string().required('Industry is required'),
            registration_number: yup.string().required('Registration number is required'),
            tradingname: yup.string().required('Trading name is required'),
            GST_number: yup.string().required('GST number is required'),
            phonenumber: yup.string()
                .required('Phone is required')
                .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number'),
            email: yup.string().email('Enter valid email').required('Email is required'),
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(edit_Company_Profile(values)).unwrap();
                setEditMode(false);
            } catch (err) {
                console.error("Edit failed", err);
            }
        },
    });

    const handleButtonClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const handleChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        // append under both names so backend that expects either will work
        appendImageToFormData(formData, file);
        dispatch(edit_Company_Profile(formData));
    };

    return (
        <div className=" ml-64 min-h-screen  bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-4 md:px-1 overflow-hidden">
            <div className="mx-auto space-y-8">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                    <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6">
                            {/* Logo and edit icon */}
                            <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                <img
                                    src={getProfileImage(company)}
                                    alt="Company logo"
                                    className="w-full h-full object-cover"
                                />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <button
                                    onClick={handleButtonClick}
                                    className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow hover:bg-gray-200"
                                >
                                    <PencilSquareIcon className="h-4 w-4 text-gray-700" />
                                </button>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{company?.legalname}</h2>
                                <p className="text-blue-600 font-medium">{company?.primary_industry}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setEditMode(!editMode)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${editMode
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 shadow-md'
                                }`}
                        >
                            <PencilSquareIcon className="h-5 w-5" />
                            {editMode ? 'Cancel Editing' : 'Edit Profile'}
                        </button>
                    </div>

                    {!editMode ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                            <div className="space-y-6">
                                <InfoRow label="Company Name" value={company?.tradingname} icon={<FaBuilding className="text-blue-500" />} />
                                <InfoRow label="Address" value={company?.address} icon={<FaMapMarkerAlt className="text-blue-500" />} />
                                <InfoRow label="Phone" value={company?.phonenumber} icon={<FaPhone className="text-blue-500" />} />
                                <InfoRow label="Registration No." value={company?.registration_number} icon={<DocumentTextIcon className="text-blue-500 w-5 h-5" />} />
                            </div>
                            <div className="space-y-6">
                                <InfoRow label="Industry" value={company?.primary_industry} icon={<div className="w-5 h-5 bg-blue-500 rounded-full" />} />
                                <InfoRow label="Email" value={company?.email} icon={<FaEnvelope className="text-blue-500" />} />
                                <InfoRow label="GST No." value={company?.GST_number} icon={<DocumentTextIcon className="text-blue-500 w-5 h-5" />} />
                            </div>
                        </div>
                    ) : (
                        <div className="p-8">
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Edit Company Profile</h3>
                                <p className="text-gray-600">Update your company information below</p>
                            </div>

                            <form onSubmit={formik.handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { label: 'Legal Name', name: 'legalname', icon: <FaBuilding className="text-blue-500" /> },
                                        { label: 'Industry', name: 'primary_industry', icon: <div className="w-5 h-5 bg-blue-500 rounded-full" /> },
                                        { label: 'Registration Number', name: 'registration_number', icon: <DocumentTextIcon className="text-blue-500 w-5 h-5" /> },
                                        { label: 'Trading Name', name: 'tradingname', icon: <FaBuilding className="text-blue-500" /> },
                                        { label: 'GST Number', name: 'GST_number', icon: <DocumentTextIcon className="text-blue-500 w-5 h-5" /> },
                                        { label: 'Phone', name: 'phonenumber', icon: <FaPhone className="text-blue-500" /> },
                                        { label: 'Email', name: 'email', icon: <FaEnvelope className="text-blue-500" /> },
                                        { label: 'Address', name: 'address', icon: <FaMapMarkerAlt className="text-blue-500" /> },
                                    ].map(field => (
                                        <div key={field.name} className="space-y-1">
                                            <label className="text-gray-700 font-medium flex items-center gap-2">
                                                {field.icon}
                                                {field.label}
                                            </label>
                                            <input
                                                type="text"
                                                name={field.name}
                                                value={formik.values[field.name]}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                            />
                                            {formik.touched[field.name] && formik.errors[field.name] && (
                                                <p className="text-red-600 text-sm">{formik.errors[field.name]}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex w-full justify-center">
                                    <button
                                        type="submit"
                                        disabled={Editloading}
                                        className={`mt-6 px-4 py-2 rounded-md w-32 text-white flex items-center justify-center ${Editloading
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700'}`}
                                    >
                                        {Editloading ? 'Editing...' : 'Submit'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="bg-gray-50 px-8 py-5 border-t border-gray-200 flex justify-center">
                        <button
                            onClick={() => setShowDocuments(!showDocuments)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 shadow-md transition"
                        >
                            {showDocuments ? <EyeSlashIcon className="h-5 w-5" /> : <DocumentTextIcon className="h-5 w-5" />}
                            {showDocuments ? "Hide Documents" : "View Documents"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
const InfoRow = ({ label, value, icon }) => (
    <div className="flex items-start gap-4">
        <div className="text-blue-500 mt-1">{icon}</div>
        <div className="flex-1">
            <div className="text-gray-600 text-sm font-medium">{label}</div>
            <div className="text-gray-900 font-medium">{value}</div>
        </div>
    </div>
);

export default CompanyProfile;
