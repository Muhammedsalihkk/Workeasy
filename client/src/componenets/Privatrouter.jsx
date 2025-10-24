import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user_profile_get } from "./Redux/Slice/userSlice/Profile";

function Privatrouter({ children }) {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  useEffect(() => {
 const checking=async  ()=> {
       try{
        const response = await dispatch(user_profile_get()).unwrap();
    }
    catch(err){
        navigate('/')
    }
 }
 checking()
    
  }, [navigate,dispatch]);

  return <>{children}</>;
}

export default Privatrouter;
