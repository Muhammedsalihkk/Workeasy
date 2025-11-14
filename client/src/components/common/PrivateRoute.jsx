import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user_profile_get } from "../../store/slices/Slice/userSlice/userProfile";

function Privatrouter({ children }) {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  useEffect(() => {
 const checking=async  ()=> {
       try{
        const response = await dispatch(user_profile_get()).unwrap();
    }
    catch(err){
      console.log("this is your error",err.status);
        if(err.status==401){
          navigate('/login')
        }
        else if(err.status==403){
          navigate('/notallowed')
        }
        else{
          navigate('/serverdown')
        }
    }
 }
 checking()
    
  }, [navigate,dispatch]);

  return <>{children}</>;
}

export default Privatrouter;
