import React from 'react'

function Company_step({ step }) {
  return (  
    <div className={`space-y-4 w-300px transition-transform duration-500 ease-in-out transform `}>
      <h2 className="text-xl font-semibold text-gray-800">Company Information</h2>
    <div className='grid grid-cols-2 gap-3'>
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Legal Name*</label>
        <input
          type="text"
          name="legalname"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Trading Name*</label>
        <input
          type="text"
          name="tradingname"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number*</label>
        <input
          type="number"
          name="registration_number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">GST Number*</label>
        <input
          type="text"
          name="GST_number"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company Type*</label>
        <select
          name="company_type"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Select company type</option>
          <option value="LLC">LLC</option>
          <option value="Corporation">Corporation</option>
          <option value="Partnership">Partnership</option>
          <option value="Sole Proprietorship">Sole Proprietorship</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Primary Industry*</label>
        <input
          type="text"
          name="primary_industry"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Annual Revenue</label>
        <input
          type="number"
          name="annual_revenue"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
         <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company email*</label>
        <input
          type="email"
          name="tradingname"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
        
      </div>
         <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company Phonenumber*</label>
        <input
          type="text"
          name="tradingname"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>
         <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
                <input
                    type="file"
                    name="logo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
    </div>
    </div>
  )
}

export default Company_step