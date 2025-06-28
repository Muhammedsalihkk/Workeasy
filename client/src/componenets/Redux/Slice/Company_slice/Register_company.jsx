import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const register_company=createAsyncThunk('company/register_company',async (company_data,thunkAPI)=>{
    try{  
        const response= await axios.post('http://localhost/api/companies',company_data)
        return response.data
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response.data||"rejistration fiald")
    }
})
const company_rejistration_slice=createSlice({
    name:"comapny_registraion",
    initialState:{
        registration_response:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(register_company.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(register_company.fulfilled,(state,action)=>{
                state.registration_response=action.payload
                state.loading=false
                
            })
            .addCase(register_company.rejected,(state,action)=>{
                state.loading=false 
                state.error=action.payload
            })
    }
})
export default company_rejistration_slice.reducer