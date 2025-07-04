import { useState } from 'react'
import Admin_step from './Admin_step';
import Company_step from './Company_step';
import Subscription_step from './Subscription_step';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [currentStep, setCurrentStep] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(false);
  const [company_id, setcomapany_id] = useState(null)
  const navigator = useNavigate('')
  const [formdata, setFormData] = useState('')
  return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
  <div className="w-full max-w-2xl bg-white rounded-lg shadow-md overflow-hidden">
    
    {/* Logo Section */}
    <div className="flex flex-col items-center py-4 cursor-pointer" onClick={() => { navigator('/') }}>
      <img
        src="https://d3bql97l1ytoxn.cloudfront.net/app_resources/422275/thumbs_112/img6234590148314030139-2x.png"
        className="w-16"
        alt="Workeasy Logo"
      />
      <h3 className="text-orange-800 text-lg font-semibold">Workeasy</h3>
    </div>

    {/* Steps */}
    <div className="px-6 py-4">
      <div className="flex items-center justify-center">

        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
            ${!currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
            {!currentStep ? 1 : "✔"}
          </div>
          <span className={`text-xs mt-1 ${!currentStep ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
            Company Details
          </span>
        </div>

        <div className={`flex-1 h-0.5 mx-2 ${currentStep == "subscription" ? 'bg-blue-500' : 'bg-gray-200'}`}></div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
            ${currentStep == "subscription" ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
            {currentStep == "subscription" ? 2 : "✔"}
          </div>
          <span className={`text-xs mt-1 ${currentStep == "subscription" ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
            Subscription
          </span>
        </div>

        <div className={`flex-1 h-0.5 mx-2 ${currentStep == "admin" ? 'bg-blue-500' : 'bg-gray-200'}`}></div>

        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
            ${currentStep == "admin" ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
            {currentStep == "admin" ? 3 : "✔"}
          </div>
          <span className={`text-xs mt-1 ${currentStep == "admin" ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
            Admin Setting
          </span>
        </div>

      </div>
    </div>

    {/* Steps Content */}
    <div className="px-6 pb-8">
      <div className="relative">
        {!currentStep && (
          <Company_step step_setting={{ currentStep, setCurrentStep, setcomapany_id }} />
        )}
        {currentStep == "subscription" && (
          <Subscription_step step_setting={{ currentStep, setCurrentStep, company_id }} />
        )}
        {currentStep == "admin" && (
          <div className="space-y-6">
            <Admin_step step_setting={{ currentStep, setCurrentStep, company_id }} />
          </div>
        )}
        {currentStep == "completed" && navigator('/login')}
      </div>
    </div>
  </div>
</div>

  )
}

export default Registration