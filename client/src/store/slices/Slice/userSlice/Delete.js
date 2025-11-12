import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async ({ employeeId }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost/auth/employee/delete/${employeeId}`,
        { withCredentials: true }
      );
      return { employeeId, data: response.data };
    } catch (error) {
      console.log("this is your error",error);
      return thunkAPI.rejectWithValue(
        (error.response && error.response.data) || "Failed to delete employee"
      );
    }
  }
);

const deleteEmployeeSlice = createSlice({
  name: "employee_delete",
  initialState: {
    loading: false,
    error: null,
    lastDeletedId: null,
  },
  reducers: {
    clearDeleteError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lastDeletedId = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.lastDeletedId = action.payload.employeeId;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete employee";
      });
  },
});

export const { clearDeleteError } = deleteEmployeeSlice.actions;
export default deleteEmployeeSlice.reducer;


