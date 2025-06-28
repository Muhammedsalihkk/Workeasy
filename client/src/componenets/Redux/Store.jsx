import {configureStore} from '@reduxjs/toolkit' 
import company_registration_reducer from './Slice/Company_slice/Register_company'
import subscription_add_reducer from './Slice/Subscription_slice/add_subscription'
import Owener_add_reducer from './Slice/Owner_slices/Register'
import owner_login_reduser, { owner_login } from './Slice/Owner_slices/Login'
import owner_profile_reducer from './Slice/Owner_slices/Profile'
export const store=configureStore({
    reducer:{
        company_add:company_registration_reducer,
        subscription_add:subscription_add_reducer,
        owner_add:Owener_add_reducer,
        owner_login:owner_login_reduser,
        owner_profile:owner_profile_reducer
    }
})