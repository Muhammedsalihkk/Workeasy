import React, { useState } from 'react'

function Paymenet({message}) {

    const [selectedPlan, setSelectedPlan] = useState(false);
    const [hoveredPlan, setHoveredPlan] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');

   
    return ( 
        <>
            <div className="flex justify-center mb-4">
                
                <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6 flex justify-between items-center">
                <span className="font-medium capitalize">
                    {selectedPlan === 'premium' ? 'Premium' : 'Standard'} Plan
                </span>
                <span className="font-semibold">
                    {selectedPlan === 'premium' ? '$99.99/month' : '$29.99/month'}
                </span>
            </div>

            <div className="space-y-4">
                <div className="flex space-x-4 mb-4">
                    {['card', 'bank'].map((method) => (
                        <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentMethod(method)}
                            className={`flex-1 py-2 px-4 rounded-md border text-center ${paymentMethod === method
                                ? 'border-blue-500 bg-blue-50 text-blue-600'
                                : 'border-gray-300'
                                }`}
                        >
                            {method === 'card' ? 'Credit Card' : 'Bank Transfer'}
                        </button>
                    ))}
                </div>

                {paymentMethod === 'card' ? (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number*</label>
                            <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date*</label>
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CVV*</label>
                                <input
                                    type="text"
                                    placeholder="123"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card*</label>
                            <input
                                type="text"
                                placeholder="John Smith"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="save-card"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="save-card" className="ml-2 text-sm text-gray-700">
                                Save card for future payments
                            </label>
                        </div>
                    </>
                ) : (
                    <>
                        {[
                            { label: 'Bank Name*', placeholder: 'e.g. Chase Bank' },
                            { label: 'Account Number*', placeholder: 'Your bank account number' },
                            { label: 'Routing Number*', placeholder: 'Your bank routing number' },
                            { label: 'Account Holder Name*', placeholder: 'Name as it appears on bank account' },
                        ].map((field, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                <input
                                    type="text"
                                    placeholder={field.placeholder}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    )
}

export default Paymenet