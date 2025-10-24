import { configureStore } from '@reduxjs/toolkit';
import company_registration_reducer from './Slice/Company_slice/Register_company';
import subscription_add_reducer from './Slice/Subscription_slice/add_subscription';
import user_add_reducer from './Slice/userSlice/Register';
import login_reducer from './Slice/userSlice/Login';
import user_profile_reducer from './Slice/userSlice/Profile';
import company_profile_reducer from './Slice/Company_slice/Profile';
import company_edit_reducer from './Slice/Company_slice/Edit';
import user_edit_reducer from './Slice/userSlice/Edit';
import user_logout_reducer from './Slice/userSlice/Logout';
import { changeReducer, otp_verify, otpReducer, otpVerifyReducer } from './Slice/userSlice/Password';
import dashbord from './Slice/Company_slice/Dashbord';
import order_reducer from './Slice/orders/getall';
import massEditReducer from './Slice/orders/editAll';
import createOrderReduce from './Slice/orders/createOne';

export const store = configureStore({
  reducer: {
    company_add: company_registration_reducer,
    company_profile: company_profile_reducer,
    subscription_add: subscription_add_reducer,
    user_add: user_add_reducer,            
    login: login_reducer,                  
    user_profile: user_profile_reducer,    
    user_edit: user_edit_reducer,
    otp_sending: otpReducer,
    otp_verify: otpVerifyReducer,
    company_edit: company_edit_reducer,
    user_logout: user_logout_reducer,      // changed from owner_logout
    password_change: changeReducer,
    company_dashbord: dashbord,
    orders: order_reducer,
    massEdit: massEditReducer,
    createOrder: createOrderReduce
  }
});
