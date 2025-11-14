import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching employee profile by ID
export const employee_profile_get = createAsyncThunk(
  "employee_profile/get",
  async (employeeId, thunkAPI) => {
    console.log("employeeeID", employeeId);
    try {
      const response = await axios.get(
        `http://localhost/auth/employee/get_profile/${employeeId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Failed to fetch employee profile"
      );
    }
  }
);

const employee_profile_slice = createSlice({
  name: "employee_profile",
  initialState: {
    employee_profile_response: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(employee_profile_get.pending, (state) => {
        state.loading = true;
      })
      .addCase(employee_profile_get.fulfilled, (state, action) => {
        state.employee_profile_response = action.payload;
        state.loading = false;
      })
      .addCase(employee_profile_get.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default employee_profile_slice.reducer;
