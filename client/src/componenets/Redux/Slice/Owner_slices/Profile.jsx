import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const Owner_profile_get=createAsyncThunk('owner/profile_get',async(data,thunkAPI)=>{
        try{
            const response= await axios.get('http://localhost/auth/owner/get_profile',{
                withCredentials:true
            })
            return response.data
        }
        catch(error){
            console.log(error);
            
            return thunkAPI.rejectWithValue(error.response.data)
        }
})
const owner_profile=createSlice({
    name:"owner_profile",
    initialState:{
        owner_profile_response:"",
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
            builder
                .addCase(Owner_profile_get.pending,(state)=>{
                    state.loading=true
                })
                .addCase(Owner_profile_get.fulfilled,(state,action)=>{
                    state.owner_profile_response=action.payload,
                    state.loading=false
                })
                .addCase(Owner_profile_get.rejected,(state,action)=>{
                    state.error=action.payload,
                    state.loading=false
                })
         }   
})
export default owner_profile.reducer