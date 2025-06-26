import  { useState } from 'react'
import Admin_step from './Admin_step';
import Company_step from './Company_step';
import Subscription_step from './Subscription_step';
import Paymenet from './Paymenet';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const  [currentStep, setCurrentStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState(false);
  const navigator=useNavigate('')
  const [formData, setFormData] = useState({
    legalname: '',
    tradingname: '',
    registration_number: '',
    GST_number: '',
    company_type: '',
    primary_industry: '',
    annual_revenue: '',
    phonenumber: '',
    email: '',
    admin_name: '',
    logo: '',
    plan_type: '',
    plan_end: '',
    block: false,
    address: {
      place: '',
      pin: '',
      district: '',
      state: ''
    },
    password: ''
  });
  return (
           <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-2000 max-w-md bg-white rounded-lg shadow-md overflow-hidden">
           <div className='grid gap-0 justify-center ' onClick={()=>{navigator('/')}}>
             <img src="https://d3bql97l1ytoxn.cloudfront.net/app_resources/422275/thumbs_112/img6234590148314030139-2x.png" className='w-18 ' alt="" />
            <h3 className='ml-1 text-orange-800'>Workeasy</h3>
           </div>
        <div className="px-6 py-8">
       
          <div className="flex items-center ">
           
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <span className={`text-sm mt-2 ${currentStep === 1 ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
                Company Details
              </span>
            </div>

            {/* Line between 1 and 2 */}
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <span className={`text-sm mt-2 ${currentStep === 2 ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
                Address & Admin
              </span>
            </div>

            {/* Line between 2 and 3 */}
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${currentStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
              <span className={`text-sm mt-2 ${currentStep === 3 ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
                Subscription
              </span>
            </div>
          </div>
        </div>

        <form className='' >
          <div className="px-6 pb-8 relative overflow-hidden">
            <div className="relative">
              {/* Step 1: Company Details */}
              {currentStep === 1 && (
                <Company_step step={currentStep}/>
              )}

              {/* Step 2: Address & Admin */}
              {currentStep === 2 && (
                <Admin_step step={currentStep}/>
              )}

              {/* Step 3: Subscription Plan */}
              {currentStep === 3 && (
                <div className="space-y-6 ">
                  {!selectedPlan ? (
                   <Subscription_step sendmessgae={setSelectedPlan}/>
                  ) : (
                    <Paymenet message={setSelectedPlan}/>
                  )}
                </div>
              )}

            </div>

            {/* Navigation Buttons */}
            <div className="mt-10 flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    if (currentStep === 3 && selectedPlan) {
                      setSelectedPlan('');
                    } else {
                      setCurrentStep(currentStep - 1);
                    }
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!selectedPlan}
                 
                  className={`ml-auto px-4 py-2 rounded-md ${selectedPlan ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  {selectedPlan ? 'Complete Payment' : 'Select a Plan'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration