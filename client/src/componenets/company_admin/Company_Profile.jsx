import React, { useState } from 'react';
import {
    DocumentTextIcon,
    EyeIcon,
    EyeSlashIcon,
    PencilSquareIcon,
    XMarkIcon,
    CloudArrowUpIcon,
    TrashIcon,
    PlusIcon
} from '@heroicons/react/24/outline';
import {
    FaBuilding,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaFilePdf,
    FaFileAlt,
    FaFileExcel,
    FaRegCopy
} from 'react-icons/fa';
import Header from './Header';

const CompanyProfile = () => {
    const [documentType, setDocumentType] = useState('all');
    const [showDocuments, setShowDocuments] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [activeDocument, setActiveDocument] = useState(null);
    const [uploadFile, setUploadFile] = useState(null);

    const [company, setCompany] = useState({
        name: 'TechCorp Solutions',
        address: '123 Business Avenue, Tech City, TC 12345',
        phone: '+1 (555) 123-4567',
        registration: 'RE6987654321',
        industry: 'Technology Services',
        email: 'contact@techcorp.com',
        gst: 'GST123456789',
        created: 'January 15, 2020',
    });

    const handleChange = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setEditMode(false);
        // API call to update company profile can be integrated here
    };

    const documents = [
        { id: 1, name: 'GST_Certificate.pdf', size: '2.4 MB', type: 'gst', icon: <FaFilePdf className="text-red-500 text-xl" /> },
        { id: 2, name: 'Registration_Proof.txt', size: '11 MB', type: 'registration', icon: <FaFileAlt className="text-blue-500 text-xl" /> },
        { id: 3, name: 'Financial_Statement.xlsx', size: '3.7 MB', type: 'financial', icon: <FaFileExcel className="text-green-500 text-xl" /> },
        { id: 4, name: 'Business_License.pdf', size: '1.8 MB', type: 'license', icon: <FaFilePdf className="text-red-500 text-xl" /> },
        { id: 5, name: 'Tax_Return_2024.pdf', size: '4.2 MB', type: 'financial', icon: <FaFilePdf className="text-red-500 text-xl" /> },
    ];

    const filteredDocuments = documentType === 'all' ? documents : documents.filter(doc => doc.type === documentType);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadFile(file);
        }
    };

    const removeFile = () => {
        setUploadFile(null);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br h-1 overflow-scroll  from-gray-50 to-blue-50 py-15 px-4 md:px-10">
            <div className=" mx-auto space-y-8">
                {/* Header */}

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-xl  border border-gray-100">
                    <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                                <img
                                   src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5e3Q2Y7kgmlwt_I4ah-twm-ltwubD5FZJCQ&s'
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{company.name}</h2>
                                <p className="text-blue-600 font-medium">{company.industry}</p>
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
                                <InfoRow label="Company Name" value={company.name} icon={<FaBuilding className="text-blue-500" />} />
                                <InfoRow label="Address" value={company.address} icon={<FaMapMarkerAlt className="text-blue-500" />} />
                                <InfoRow label="Phone" value={company.phone} icon={<FaPhone className="text-blue-500" />} />
                                <InfoRow label="Registration No." value={company.registration} icon={<DocumentTextIcon className="text-blue-500 w-5 h-5" />} />
                            </div>

                            <div className="space-y-6">
                                <InfoRow label="Industry" value={company.industry} icon={<div className="w-5 h-5 bg-blue-500 rounded-full" />} />
                                <InfoRow label="Email" value={company.email} icon={<FaEnvelope className="text-blue-500" />} />
                                <InfoRow label="GST No." value={company.gst} icon={<DocumentTextIcon className="text-blue-500 w-5 h-5" />} />
                                <InfoRow label="Created" value={company.created} icon={<div className="w-5 h-5 bg-blue-500 rounded-full" />} />
                            </div>
                        </div>
                    ) : (
                        <div className="p-8">
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Edit Company Profile</h3>
                                <p className="text-gray-600">Update your company information below</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { label: 'Company Name', name: 'name', icon: <FaBuilding className="text-blue-500" /> },
                                    { label: 'Industry', name: 'industry', icon: <div className="w-5 h-5 bg-blue-500 rounded-full" /> },
                                    { label: 'Address', name: 'address', icon: <FaMapMarkerAlt className="text-blue-500" /> },
                                    { label: 'Phone', name: 'phone', icon: <FaPhone className="text-blue-500" /> },
                                    { label: 'Email', name: 'email', icon: <FaEnvelope className="text-blue-500" /> },
                                    { label: 'GST Number', name: 'gst', icon: <DocumentTextIcon className="text-blue-500 w-5 h-5" /> },
                                ].map(field => (
                                    <div key={field.name} className="space-y-1">
                                        <label className="block text-gray-700 font-medium flex items-center gap-2">
                                            {field.icon}
                                            {field.label}
                                        </label>
                                        <input
                                            type="text"
                                            name={field.name}
                                            value={company[field.name]}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-3 mt-8">
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-700 hover:from-green-700 hover:to-teal-800 text-white rounded-lg font-medium flex items-center gap-2 shadow-md transition"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium flex items-center gap-2 transition"
                                >
                                    <XMarkIcon className="h-5 w-5" /> Cancel
                                </button>
                            </div>
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

                {/* Documents Section */}
                {showDocuments && (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Company Documents</h2>
                                <p className="text-gray-600 mt-1">Manage your official company documents</p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {['all', 'gst', 'registration', 'financial', 'license'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setDocumentType(type)}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${documentType === type
                                                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {type === 'all' ? 'All Documents' : type.charAt(0).toUpperCase() + type.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredDocuments.map(doc => (
                                    <DocumentCard
                                        key={doc.id}
                                        doc={doc}
                                        onClick={() => setActiveDocument(doc)}
                                    />
                                ))}
                            </div>

                            {/* File Upload Section */}
                            <div className="mt-8 border border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition">
                                <div className="flex flex-col items-center">
                                    <CloudArrowUpIcon className="h-12 w-12 text-blue-500 mb-3" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">Upload New Document</h3>
                                    <p className="text-gray-600 mb-4">Drag and drop files or click to browse</p>

                                    <div className="mb-4">
                                        <label className="relative cursor-pointer">
                                            <span className="px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer">
                                                Choose File
                                            </span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileUpload}
                                            />
                                        </label>
                                    </div>

                                    {uploadFile && (
                                        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 w-full max-w-md">
                                            <div className="flex items-center gap-3">
                                                <DocumentTextIcon className="h-8 w-8 text-blue-500" />
                                                <div>
                                                    <div className="font-medium text-gray-800 truncate max-w-xs">{uploadFile.name}</div>
                                                    <div className="text-sm text-gray-500">{(uploadFile.size / 1024 / 1024).toFixed(2)} MB</div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={removeFile}
                                                className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600 text-center">
                                <span className="font-medium">Note:</span> All documents are securely stored with 256-bit encryption
                            </p>
                        </div>
                    </div>
                )}

                {/* Document Preview Modal */}
                {activeDocument && (
                    <div className="fixed inset-0  backdrop-blur-[2px] flex items-center justify-center z-50 ">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900">{activeDocument.name}</h3>
                                <button
                                    onClick={() => setActiveDocument(null)}
                                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="p-6 flex flex-col items-center">
                                <div className="mb-6">
                                    {activeDocument.type === 'pdf' ? (
                                        <FaFilePdf className="text-red-500 text-7xl" />
                                    ) : activeDocument.type === 'excel' ? (
                                        <FaFileExcel className="text-green-500 text-7xl" />
                                    ) : (
                                        <FaFileAlt className="text-blue-500 text-7xl" />
                                    )}
                                </div>

                                <div className="w-full max-w-md space-y-4">
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600">Document Type:</span>
                                        <span className="font-medium capitalize">{activeDocument.type}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600">File Size:</span>
                                        <span className="font-medium">{activeDocument.size}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-2">
                                        <span className="text-gray-600">Uploaded:</span>
                                        <span className="font-medium">June 15, 2025</span>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-8">
                                    <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-medium flex items-center gap-2 shadow-md">
                                        <FaRegCopy className="h-4 w-4" /> Copy Link
                                    </button>
                                    <button className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-50">
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Reusable InfoRow component
const InfoRow = ({ label, value, icon }) => (
    <div className="flex items-start gap-4">
        <div className="text-blue-500 mt-1">
            {icon}
        </div>
        <div className="flex-1">
            <div className="text-gray-600 text-sm font-medium">{label}</div>
            <div className="text-gray-900 font-medium">{value}</div>
        </div>
    </div>
);

// Document card component
const DocumentCard = ({ doc, onClick }) => (
    <div
        className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition cursor-pointer group"
        onClick={onClick}
    >
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition">
                {doc.icon}
            </div>
            <div className="flex-1">
                <div className="font-medium text-gray-800 group-hover:text-blue-600 transition">{doc.name}</div>
                <div className="text-sm text-gray-500">{doc.size}</div>
            </div>
            <div className="text-gray-400 group-hover:text-blue-500 transition">
                <EyeIcon className="h-5 w-5" />
            </div>
        </div>
    </div>
);

export default CompanyProfile;