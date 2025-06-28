
import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { add_subscription } from '../../Redux/Slice/Subscription_slice/add_subscription';

function Subscription_step({ step_setting }) {
    const [hoveredPlan, setHoveredPlan] = useState('')
    const [selectedPlan, setSelectedPlan] = useState(false);
    const { currentStep, setCurrentStep,company_id } = step_setting
    const [plan, setplan] = useState(false);
    const {subscription_response,loading,error}=useSelector((state)=>state.subscription_add)
    const dispatch=useDispatch()

    useEffect(()=>{
        if(subscription_response){
            setCurrentStep("admin")
        }
        else{
            console.log(error);
            
        }
    },[subscription_response,error])
    const handlePayment = async (plan) => {  
        plan.company_id=company_id
        const date=new Date()
        const day=date.getDate()
        const month=date.getMonth()+1
        const year=date.getFullYear()
        const today=`${year}-${month}-${day}`
        const sub_data={plan_type:plan.plan_type,company_id:company_id,amount:plan.price,plan_start:today,}
        if(plan.plan_type=="Monthly")
        {
            sub_data.plan_end=`${year}-${month+1}-${day}`
        }
        else{
            sub_data.plan_end=`${year+1}-${month}-${day}`
        }
        const options = {
            key: "rzp_test_wLfumijXK4YGve",
            amount: 100 * plan.price,
            currency: "INR",
            name: "workeasy",
            description: selectedPlan.name,
            handler: function (response) {
                alert("✅ Payment successful!\nPayment ID: " + response.razorpay_payment_id);
                sub_data.payment_id=response.razorpay_payment_id
                setSelectedPlan(true)
                dispatch(add_subscription(sub_data))
            },
            modal: {
                ondismiss: () => {
                    alert("❌ Payment was cancelled or closed.");
                    setCurrentStep("subscription")
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const Subscription = [
        { 
            plan_type: 'Monthly',
            price: 499,
            description: 'Pay every month. Cancel anytime.',
            features: [
                'Up to 25 users',
                'Advanced analytics',
                'Email support',
            ],
        },
        {  
            plan_type: 'Yearly',
            price: 4999,
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
                        onMouseEnter={() => setHoveredPlan(plan.id)}
                        onMouseLeave={() => setHoveredPlan('')}
                    >
                        <div className="flex flex-col ">
                            <div className="justify-between grid grid-cols-2 items-center mb-4">
                                <h3 className="text-lg font-semibold capitalize">{plan.name}</h3><br />
                                <span className="text-blue-600 font-bold">₹{plan.price}/{plan.id}</span>
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
                            <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setCurrentStep(currentStep)
                                    handlePayment(plan)
                                }}>
                                Select Plan
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-end mt-10'>

                <button type="submit"
                    onClick={() => {console.log(plan);
                    }}
                    className={`px-4 py-2 rounded-md w-30 text-white transition-colors duration-300 
              ${!selectedPlan
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"}`}>
                    Next
                </button>
            </div>
        </>
    )
}

export default Subscription_step