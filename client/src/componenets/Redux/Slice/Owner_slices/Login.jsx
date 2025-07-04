import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const login = createAsyncThunk('owner/login', async (data, thunkAPI) => {
    try {
        console.log(data);
        
        if(data.role=="admin"){
             const response = await axios.post('http://localhost/auth/owner/login', data, {
            withCredentials: true
        })
        return response.data
    }
    else if(data.role=="employee"){
            const response = await axios.post('http://localhost/auth/employee/login', data, {
            withCredentials: true
        })
        return response.data
    }
        }
       
    catch (error) {
        console.log(error.response.data);

        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const login_slice = createSlice({
    name: "login",
    initialState: {
        login_response: "",
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.login_response = action.payload,
                    state.loading = false
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload,
                    state.loading = false
            })
    }
})

export default login_slice.reducer

