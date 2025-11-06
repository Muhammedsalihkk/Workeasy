import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const otp_sending = createAsyncThunk('owner/password', async (email, thunkAPI) => {
    try {    
        const response = await axios.post('http://localhost/auth/owner/sendotp',{email},{
            withCredentials: true
        })
        console.log(response.data);
        
        return response.data
    }
    catch (error) {
        console.log(error.response.data);
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const otp_verify = createAsyncThunk('owner/password', async (enterdotp, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost/auth/owner/verify', {enterdotp}, {
            withCredentials: true
        })
        return response.data
    }
    catch (error) {
        console.log(error.response.data);

        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const changge_password = createAsyncThunk('owner/password', async (new_password,thunkAPI) => {
    try {
        const response = await axios.post('http://localhost/auth/owner/changepassword', {new_password}, {
            withCredentials: true
        })
        return response.data
    }
    catch (error) {
        console.log(error.response.data);

        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const otp_slice = createSlice({
    name: "otp_verify",
    initialState: {
        otp_response: "",
        otp_loading: false,
        otp_error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(otp_sending.pending, (state) => {
                state.otp_loading = true
            })
            .addCase(otp_sending.fulfilled, (state, action) => {
                state.otp_response = action.payload,
                    state.otp_loading = false
            })
            .addCase(otp_sending.rejected, (state, action) => {
                state.otp_error = action.payload,
                state.otp_loading = false
            })
    }
})
const otp_verify_slice = createSlice({
    name: "otp_send",
    initialState: {
        verify_response: "",
        verify_loading: false,
        verfy_error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(otp_verify.pending, (state) => {
                state.verify_loading = true
            })
            .addCase(otp_verify.fulfilled, (state, action) => {
                state.verify_response = action.payload,
                    state.verify_loading = false
            })
            .addCase(otp_verify.rejected, (state, action) => {
                state.verfy_error = action.payload,
                state.verify_loading = false
            })
    }
})
const change_password_slice = createSlice({
    name: "changepassword",
    initialState: {
        change_response: "",
        change_loading: false,
        change_error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(changge_password.pending, (state) => {
                state.change_loading = true
            })
            .addCase(changge_password.fulfilled, (state, action) => {
                state.change_response = action.payload,
                    state.change_loading = false
            })
            .addCase(changge_password.rejected, (state, action) => {
                state.change_error = action.payload,
                state.change_loading = false
            })
    }
})
export const otpReducer = otp_slice.reducer;
export const otpVerifyReducer = otp_verify_slice.reducer;
export const changeReducer=change_password_slice.reducer