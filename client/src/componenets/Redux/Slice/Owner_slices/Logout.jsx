import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const owner_logout = createAsyncThunk('owner/login', async (data, thunkAPI) => {
    try {
        console.log(data);
        
        const response = await axios.post('http://localhost/auth/user/logout',{},{
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
const logout_slice = createSlice({
    name: "owner_logout",
    initialState: {
        owner_logout_response: "",
        logout_loading: false,
        logout_error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(owner_logout.pending, (state) => {
                state.logout_loading = true
            })
            .addCase(owner_logout.fulfilled, (state, action) => {
                state.owner_logout_response = action.payload,
                    state.logout_loading = false
            })
            .addCase(owner_logout.rejected, (state, action) => {
                state.logout_error = action.payload,
                    state.logout_loading = false
            })
    }
})
export default logout_slice.reducer
