import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const DashBoard_data = createAsyncThunk("comapny/profile", async (thunkAPI) => {
    try {
        const response = await axios.get(`http://localhost/auth/employee/count`, {
            withCredentials: true
        })
        console.log(response);
        
        return response.data
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.response.data||"somthing wrong")
    }
})
const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        employee_count: null,
        loading: false,
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(DashBoard_data.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DashBoard_data.fulfilled, (state, action) => {
                state.loading = false;
                state.employee_count = action.payload;
            })
            .addCase(DashBoard_data.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default employeeSlice.reducer;


