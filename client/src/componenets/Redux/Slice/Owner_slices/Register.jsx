import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const add_owner = createAsyncThunk("owner/add", async (data, thunkAPI) => {
    try {   
        console.log("datais",data);
        
        const response = await axios.post('http://localhost/auth/owner/register',data)
        return response.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || "registration faild")
    }
})

const owner_add_slice = createSlice({
    name:"owner_registration",
    initialState: {
        owner_response_data: null,
        loading: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(add_owner.pending, (state) => {
                    state.loading=true
            })  
            .addCase(add_owner.fulfilled,(state,action)=>{
                state.owner_response_data=action.payload
                state.loading=false
            })
            .addCase(add_owner.rejected,(state,action)=>{
                state.error=action.payload
                state.loading=false
            })
    }
})

export default owner_add_slice.reducer