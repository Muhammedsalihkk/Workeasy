import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const register_employee = createAsyncThunk(
  "employee/register",
  async (data, thunkAPI) => {
    try {
      console.log(data)
      const response = await axios.post(
        "http://localhost/auth/employee/register",
        data,
        {withCredentials:true}
      );
      return response.data;     // ✅ real API result is returned
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error?.response?.data) || "Registration failed"
      );
    }
  }
);

// ✅ Slice
const employee_register_slice = createSlice({
  name: "employee_registration",

  initialState: {
    employee_data: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(register_employee.pending, (state) => {
        state.loading = true;        // loader is shown
        state.error = null;
      })
      .addCase(register_employee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee_data = action.payload;   // result saved
      })
      .addCase(register_employee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;           // error saved
      });
  },
});

export default employee_register_slice.reducer;
