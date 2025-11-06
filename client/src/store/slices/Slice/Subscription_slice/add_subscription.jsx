import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const add_subscription = createAsyncThunk("subscription/add", async (subscription_data, thunkAPI) => {
    try {
        console.log(subscription_data);
        
        const response =await axios.post('http://localhost/api/subscription',subscription_data)
        return response.data
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response.message)
    }
})

const subscription_slice=createSlice({
    name:"subscription",
    initialState:{
        subscription_response:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(add_subscription.pending,(state)=>{
                state.loading=true
            })
            .addCase(add_subscription.fulfilled,(state,action)=>{
                state.loading=false
                state.subscription_response=action.payload
            })
            .addCase(add_subscription.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload
            })
    }
})

export default subscription_slice.reducer