import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const facestoring=createAsyncThunk('employee/facestore',async({id,images},thunkAPI)=>{
    try{
        const response=axios.post(`http://localhost:3003/api/attendence/user/${id}`,{images},{
            withCredentials:true
        })
    }
    catch(error){
        console.log(error.message);
        
    }
})