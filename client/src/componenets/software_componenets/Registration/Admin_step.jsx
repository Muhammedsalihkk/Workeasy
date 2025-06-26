import React from 'react'

function Admin_step({step}) {
    return (
        <div className={`space-y-4 grid grid-cols-2 gap-5 transition-transform duration-500 ease-in-out transform ${step==2?'translate-x-0':'translate-x-full'}`}>
        
           <div className='grid gap-3.5'>
             <h2 className="text-xl font-semibold text-gray-800 pt-4">Admin Information</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Name*</label>
                <input
                    type="text"
                    name="admin_name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <input
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                <input
                    type="tel"
                    name="phonenumber"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                <input
                    type="password"
                    name="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
           </div>
         <div className='grid gap-3.5 mt-4'>
               <h2 className="text-xl font-semibold text-gray-800">Address Information </h2>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                <input
                    type="text"
                    name="address.place"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code*</label>
                <input
                    type="number"
                    name="address.pin"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District*</label>
                <input
                    type="text"
                    name="address.district"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
                <input
                    type="text"
                    name="address.state"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>
         </div>

         
        </div>
    )
}

export default Admin_step