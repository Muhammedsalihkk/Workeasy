
import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { add_subscription } from '../../../store/slices/Slice/Subscription_slice/add_subscription';

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
                    {!loading?"Next":  <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
          </svg>}
                </button>
            </div>
        </>
    )
}

export default Subscription_step