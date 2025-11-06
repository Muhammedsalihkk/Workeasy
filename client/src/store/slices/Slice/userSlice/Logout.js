import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const user_logout = createAsyncThunk('user/login', async (data, thunkAPI) => {
    try {
        console.log(data);
        
        const response = await axios.post('http://localhost/auth/user/logout',{},{
            withCredentials: true
        })
        localStorage.clear("userId")
        return response.data
    }
    catch (error) {
        console.log(error.response.data);

        return thunkAPI.rejectWithValue(error.response.data)
    }
})
const logout_slice = createSlice({
    name: "user_logout",
    initialState: {
        user_logout_response: "",
        logout_loading: false,
        logout_error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(user_logout.pending, (state) => {
                state.logout_loading = true
            })
            .addCase(user_logout.fulfilled, (state, action) => {
                state.user_logout_response = action.payload,
                    state.logout_loading = false
            })
            .addCase(user_logout.rejected, (state, action) => {
                state.logout_error = action.payload,
                    state.logout_loading = false
            })
    }
})
export default logout_slice.reducer
