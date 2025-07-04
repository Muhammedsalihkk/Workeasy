import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const employee_profile_get = createAsyncThunk('owner/profile_get', async (id, thunkAPI) => {
    try {
        if (id) {
              console.log("id is this is ",id);
            const response = await axios.get(`http://localhost/auth/employee/get_profile?id=${id}`, {
                withCredentials: true
            })
            return response.data
        }
        else{
              const response = await axios.get(`http://localhost/auth/employee/get_profile`,{
                withCredentials: true
            })
            return response.data
        }

    }
    catch (error) {
        console.log(error);

        return thunkAPI.rejectWithValue(error.response.data)
    }
})
const employee_profile = createSlice({
    name: "owner_profile",
    initialState: {
        employee_profile_response: "",
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(employee_profile_get.pending, (state) => {
                state.loading = true
            })
            .addCase(employee_profile_get.fulfilled, (state, action) => {
                console.log(action.payload.data);

                state.employee_profile_response = action.payload,
                    state.loading = false
            })
            .addCase(employee_profile_get.rejected, (state, action) => {
                state.error = action.payload,
                    state.loading = false
            })
    }
})
export default employee_profile.reducer