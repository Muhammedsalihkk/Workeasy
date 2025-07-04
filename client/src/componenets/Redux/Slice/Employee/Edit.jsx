import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const edit_employee = createAsyncThunk("employee/edit", async ({ data, id }, thunkAPI) => {
    try {
        console.log(data);

        if (id) {
            const response = await axios.put(`http://localhost/auth/employee/edit_profile?id=${id}`, { data }, {
                withCredentials: true
            })
            console.log(response.data);

            return response.data
        }
        else {
            const response = await axios.post('http://localhost/auth/employee/edit_profile', {
                withCredentials: true
            })
            console.log(response.data);

            return response.data
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || "registration faild")
    }
})
export const delete_employee = createAsyncThunk(`employee/delete`, (id) => {
    try {
        const response = axios.delete(`http://localhost/auth/employee/delete/${id}`, {
            withCredentials: true
        })
        return response.data

    }
    catch (error) {
        return error.message
    }
})
const employee_edit = createSlice({
    name: "employee_profile",
    initialState: {
        employee_eidit_response: "",
        loading: false,
        error: null,
        employee_delete_response: "",
        delete_loading: false,
        delete_error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(edit_employee.pending, (state) => {
                state.loading = true
            })
            .addCase(edit_employee.fulfilled, (state, action) => {
                state.employee_eidit_response = action.payload,
                    state.loading = false
            })
            .addCase(edit_employee.rejected, (state, action) => {
                state.error = action.payload,
                state.loading = false
            })
            .addCase(delete_employee.pending, (state) => {
                state.delete_loading = true
            })
            .addCase(delete_employee.fulfilled, (state, action) => {
                state.employee_delete_response = action.payload,
                state.delete_loading = false
            })
            .addCase(delete_employee.rejected, (state, action) => {
                state.delete_error = action.payload,
                state.delete_loading = false
            })
    }
})
export default employee_edit.reducer