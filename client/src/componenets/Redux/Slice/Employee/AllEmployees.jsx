import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const getall_employee = createAsyncThunk("employee/getall", async ({ search, department, status }={}, thunkAPI) => {
    try {
        
        const params=new URLSearchParams()
        if (search) params.append('search', search);
        if (department) params.append('department', department);
        if (status) params.append('status', status);
        console.log(status);
        
        const response = await axios.get(`http://localhost/auth/employee/getall_employee?${params.toString()}`, {
            withCredentials: true
        })
        console.log("res", response.data);

        return response.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || "registration faild")
    }
})

const getall_employee_slice = createSlice({
    name: "Employee_registration",
    initialState: {
        employee_response_data: null,
        loading: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getall_employee.pending, (state) => {
                state.loading = true
            })
            .addCase(getall_employee.fulfilled, (state, action) => {
                state.employee_response_data = action.payload
                state.loading = false
            })
            .addCase(getall_employee.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
    }
})

export default getall_employee_slice.reducer