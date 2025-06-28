import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const owner_login=createAsyncThunk('owner/login',async(data,thunkAPI)=>{
        try{
            const response= await axios.post('http://localhost/auth/owner/login',data)
            return response.data
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
})

const login_slice=createSlice({
    name:"owner_login",
    initialState:{
        owner_login_response:"",
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
            builder
                .addCase(owner_login.pending,(state)=>{
                    state.loading=true
                })
                .addCase(owner_login.fulfilled,(state,action)=>{
                    state.owner_login_response=action.payload,
                    state.loading=false
                })
                .addCase(owner_login.rejected,(state,action)=>{
                    state.error=action.payload,
                    state.loading=false
                })
         }   
})

export default login_slice.reducer

