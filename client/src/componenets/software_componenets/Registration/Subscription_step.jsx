import React from 'react'
import { useState } from 'react';

function Subscription_step({sendmessgae}) {
    const [hoveredPlan,setHoveredPlan]=useState('')
     const [selectedPlan, setSelectedPlan] = useState(false);

    const Subscription = [

        {
            id: 'monthly',
            name: 'Monthly Plan',
            price: '₹499/month',
            description: 'Pay every month. Cancel anytime.',
            features: [
                'Up to 25 users',
                'Advanced analytics',
                'Email support',
            ],
        },
        {
            id: 'yearly',
            name: 'Yearly Plan',
            price: '₹4,999/year',
            description: 'Best value. Save more with annual billing.',
            features: [
                'Up to 25 users',
                'Advanced analytics',
                'Priority support',
            ],
        }


    ]
    return (    
        <>
            <h2 className="text-2xl font-bold text-gray-800">Choose a Subscription Plan</h2>
            <div className="grid grid-cols-1  md:grid-cols-1 gap-6">
                {Subscription.map((plan) => (
                    <div
                        key={plan.id}
                        className={`border rounded-xl p-5  shadow-sm hover:shadow-md ${hoveredPlan === plan.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                            }`}
                        onClick={() => setSelectedPlan(plan.id)}
                        onMouseEnter={() => setHoveredPlan(plan.id)}
                        onMouseLeave={() => setHoveredPlan('')}
                    >
                        <div className="flex flex-col ">
                            <div className="justify-between grid grid-cols-2 items-center mb-4">
                                <h3 className="text-lg font-semibold capitalize">{plan.name}</h3><br />
                                <span className="text-blue-600 font-bold">{plan.price}</span>
                            </div>
                            <ul className="text-sm text-gray-600 space-y-2 flex-grow">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg
                                            className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    sendmessgae(plan.id);
                                }}
                            >
                                Select Plan
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Subscription_step