import { LayoutDashboardIcon } from 'lucide-react';
import React from 'react';
import Header from '../Header';

const SalaryDetailsUI = ({message}) => {
    const header=<div className='flex gap-2.5'>
   <LayoutDashboardIcon className="w-7 h-7 text-gray-700" />
          <h2 className="text-xl font-bold text-gray-800">DashBoard</h2></div>

    const {user}=message
  return (
    <div className=" w-full from-gray-50 to-gray-100 overflow-scroll  ">
        <div className='w-full'>
            <Header message={{user}}/>
        </div>
      <div className="max-w-full  mx-10  ">
        <div className="flex flex-col md:flex-row gap-8 ">
          {/* Left Sidebar */}
       
          
          {/* Main Content */}
          <div className="  grid w-full h-155    ">
            {/* Summary Cards */}
            <div className='mt-5'>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
                <div className="text-sm mb-1">Current Salary</div>
                <div className="text-2xl font-bold mb-2">$142,000</div>
                <div className="text-xs opacity-80">Annual base salary</div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl p-6 shadow-lg">
                <div className="text-sm mb-1">YTD Earnings</div>
                <div className="text-2xl font-bold mb-2">$85,600</div>
                <div className="text-xs opacity-80">Jan 1 - Jun 20, 2023</div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg">
                <div className="text-sm mb-1">Next Payment</div>
                <div className="text-2xl font-bold mb-2">$5,461</div>
                <div className="text-xs opacity-80">Due Jun 29, 2023</div>
              </div>
            </div>
            
            {/* Salary Breakdown */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Salary Breakdown</h2>
                <div className="flex gap-2">
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-lg">
                    2023
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-lg">
                    Q2
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1 rounded-lg">
                    Current
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Base Salary */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Base Salary</span>
                    <span className="font-medium">$142,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                {/* Project Bonuses */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Project Bonuses</span>
                    <span className="font-medium">$21,300</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                
                {/* Royalties */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Royalties</span>
                    <span className="font-medium">$8,500</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-bold">
                    <span>Total Compensation</span>
                    <span className="text-green-600">$171,800</span>
                  </div>
                </div>
              </div>
              
              {/* Deductions */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Deductions</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Federal Tax</span>
                    <span className="text-red-600">-$42,950</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">State Tax</span>
                    <span className="text-red-600">-$12,870</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Health Insurance</span>
                    <span className="text-red-600">-$4,800</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Retirement Plan</span>
                    <span className="text-red-600">-$8,590</span>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="flex justify-between font-medium">
                      <span>Total Deductions</span>
                      <span className="text-red-600">-$69,210</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            </div>
           
            
            {/* Payment History */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Payment History</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { date: 'Jun 15, 2023', description: 'Regular Salary', amount: '$5,461', status: 'Paid', project: 'N/A' },
                      { date: 'Jun 1, 2023', description: 'Regular Salary', amount: '$5,461', status: 'Paid', project: 'N/A' },
                      { date: 'May 25, 2023', description: 'Project Bonus', amount: '$8,500', status: 'Paid', project: 'Cosmic Voyage' },
                      { date: 'May 15, 2023', description: 'Regular Salary', amount: '$5,461', status: 'Paid', project: 'N/A' },
                      { date: 'May 1, 2023', description: 'Regular Salary', amount: '$5,461', status: 'Paid', project: 'N/A' },
                      { date: 'Apr 28, 2023', description: 'Royalties Payment', amount: '$3,200', status: 'Paid', project: 'Urban Legends S2' },
                    ].map((payment, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{payment.description}</div>
                          <div className="text-sm text-gray-500">{payment.project}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{payment.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                          <a href="#" className="hover:text-purple-900">View</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing 6 of 24 payments
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                  View All Payments
                </button>
              </div>
            </div>
          </div>
          
        </div>
       
      </div>
    </div>
  );
};

export default SalaryDetailsUI;