import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const user_edit = createAsyncThunk(
  "user/edit",
  async (data, thunkAPI) => {
    try {
      // Check if data is FormData to set proper headers
      const config = {
        withCredentials: true,
      };
      
      // If data is FormData, let axios set Content-Type automatically
      // Otherwise, set it to application/json
      if (!(data instanceof FormData)) {
        config.headers = {
          'Content-Type': 'application/json',
        };
      }
      console.log(data);
      
      const response = await axios.put(
        "http://localhost/auth/user/edit_profile",
        data,
        config
      );
      
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Something went wrong"
      );
    }
  }
);

// Async thunk for editing employee profile by ID
export const employee_edit = createAsyncThunk(
  "employee/edit_profile",
  async ({ employeeId, data }, thunkAPI) => {
    try {
      // Check if data is FormData to set proper headers
      const config = {
        withCredentials: true,
      };
      
      // If data is FormData, let axios set Content-Type automatically
      // Otherwise, set it to application/json
      if (!(data instanceof FormData)) {
        config.headers = {
          'Content-Type': 'application/json',
        };
      }
     
      const response = await axios.put(
        `http://localhost/auth/employee/edit_profile/${employeeId}`,
        data,
        config
      );
      
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Something went wrong"
      );
    }
  }
);

const user_edit_slice = createSlice({
  name: "user_edit",
  initialState: {
    user_edit_response: "",
    editLoading: false,
    editError: null,
  },
  reducers: {
    clearError: (state) => {
      state.editError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(user_edit.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(user_edit.fulfilled, (state, action) => {
        state.user_edit_response = action.payload;
        state.editLoading = false;
      })
      .addCase(user_edit.rejected, (state, action) => {
        state.editError = action.payload;
        state.editLoading = false;
      })
      .addCase(employee_edit.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(employee_edit.fulfilled, (state, action) => {
        state.user_edit_response = action.payload;
        state.editLoading = false;
      })
      .addCase(employee_edit.rejected, (state, action) => {
        state.editError = action.payload;
        state.editLoading = false;
      });
  },
});

export const { clearError } = user_edit_slice.actions;
export default user_edit_slice.reducer;
