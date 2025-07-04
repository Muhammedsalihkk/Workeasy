import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const add_employee = createAsyncThunk("employee/add", async (data, thunkAPI) => {
    try {   
        const response = await axios.post('http://localhost/auth/employee/register',data,{
            withCredentials:true
        })
        return response.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || "registration faild")
    }
})

const employee_add_slice = createSlice({
    name:"Employee_registration",
    initialState: {
        employee_response_data: null,
        loading: null,
        error: null
    },
    reducers: {
        errorclear:(state)=>{
            state.error=""
        }   
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_employee.pending, (state) => {
                    state.loading=true
            })  
            .addCase(add_employee.fulfilled,(state,action)=>{
                state.employee_response_data=action.payload
                state.loading=false
            })
            .addCase(add_employee.rejected,(state,action)=>{
                state.error=action.payload
                state.loading=false
            })
    }
})

export const {errorclear}=employee_add_slice.actions
export default employee_add_slice.reducer