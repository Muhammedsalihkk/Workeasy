import {configureStore} from '@reduxjs/toolkit' 
import company_registration_reducer from './Slice/Company_slice/Register_company'
import subscription_add_reducer from './Slice/Subscription_slice/add_subscription'
import Owener_add_reducer from './Slice/Owner_slices/Register'
import login_reduser from './Slice/Owner_slices/Login'
import owner_profile_reducer from './Slice/Owner_slices/Profile'
import company_profile_reducer from './Slice/Company_slice/Profile'
import company_edit_reducer from './Slice/Company_slice/Edit'
import Owner_edit_reducer from './Slice/Owner_slices/Edit'
import owner_logout_reducer from './Slice/Owner_slices/Logout'
import { changeReducer, otp_verify, otpReducer, otpVerifyReducer } from './Slice/Owner_slices/Password'
import get_allEmployees_reducer from './Slice/Employee/AllEmployees'
import employee_add_reducer from './Slice/Employee/Register'
import employee_profile_reducer from './Slice/Employee/Profile'
import employee_profile_edit_reducer from './Slice/Employee/Edit'
import dashbord from './Slice/Company_slice/Dashbord'
export const store=configureStore({
    reducer:{
        company_add:company_registration_reducer,
        company_profile:company_profile_reducer,
        subscription_add:subscription_add_reducer,
        owner_add:Owener_add_reducer,
        login:login_reduser,
        owner_profile:owner_profile_reducer,
        owner_edit:Owner_edit_reducer,
        otp_sending:otpReducer,
        otp_verify:otpVerifyReducer,
        company_edit:company_edit_reducer,
        owner_logout:owner_logout_reducer,
        password_change:changeReducer,
        employee_register:employee_add_reducer,
        get_all_employees:get_allEmployees_reducer,
        employee_profile:employee_profile_reducer,
        employee_edit:employee_profile_edit_reducer,
        company_dashbord:dashbord
    }
})