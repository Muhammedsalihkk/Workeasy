import  { useState } from 'react'
import Admin_step from './Admin_step';
import Company_step from './Company_step';
import Subscription_step from './Subscription_step';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const  [currentStep, setCurrentStep] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(false);
  const [company_id,setcomapany_id]=useState(null)
  const navigator=useNavigate('')
  const [formdata,setFormData]=useState('')
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
                ${!currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {!currentStep?1:"✔"}
              </div>
              <span className={`text-sm mt-2 ${!currentStep  ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
                Company Details
              </span>
            </div>

            {/* Line between 1 and 2 */}
            <div className={`flex-1 h-1 mx-2 ${currentStep=="subscription" ? 'bg-blue-500' : 'bg-gray-200'}`}></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${currentStep =="subscription"  ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {currentStep=="subscription"?2:"✔"}
              </div>
              <span className={`text-sm mt-2 ${currentStep === 2 ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
                 Subscription
              </span>
            </div>

           
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${currentStep == "admin" ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {currentStep=="admin"?3:"✔"}
              </div>
              <span className={`text-sm mt-2 ${currentStep === 3 ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
                Admin Setting
               
              </span>
            </div>
          </div>
        </div>

        <div className='' >
          <div className="px-6 pb-8 relative overflow-hidden">
            <div className="relative">
             
              {!currentStep && (
                <Company_step step_setting={{currentStep,setCurrentStep,setcomapany_id}}/>
              )}
              {currentStep == "subscription" && (
                <Subscription_step step_setting={{currentStep,setCurrentStep,company_id}}/>
                
              )}

              {currentStep == "admin" && (
                <div className="space-y-6 ">
                   <Admin_step step_setting={{currentStep,setCurrentStep,company_id}}/>
                </div>
              )}
              {currentStep=="completed"&&navigator('/login')}

            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration