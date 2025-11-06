import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const company_Profile = createAsyncThunk("comapny/profile", async (thunkAPI) => {
    try {
        
        
        const response = await axios.get(`http://localhost/api/companies`, {
            withCredentials: true
        })
        return response.data
    }
    catch(error){
        console.log(error.message);
        
        return thunkAPI.rejectWithValue(error.response.data||"somthing wrong")
    }
})

const Company_profile_slice=createSlice({
    name:"comapny_profile",
    initialState:{
        Profile_response:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(company_Profile.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(company_Profile.fulfilled,(state,action)=>{
                state.Profile_response=action.payload
                state.loading=false
                
            })
            .addCase(company_Profile.rejected,(state,action)=>{
                state.loading=false 
                state.error=action.payload
            })
    }
})
export default Company_profile_slice.reducer