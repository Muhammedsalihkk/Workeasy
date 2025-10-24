import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user registration
export const add_user = createAsyncThunk("user/add", async (data, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost/auth/user/register", data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      (error.response && error.response.data) || "Registration failed"
    );
  }
});

const user_add_slice = createSlice({
  name: "user_registration",
  initialState: {
    user_response_data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(add_user.pending, (state) => {
        state.loading = true;
      })
      .addCase(add_user.fulfilled, (state, action) => {
        state.user_response_data = action.payload;
        state.loading = false;
      })
      .addCase(add_user.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default user_add_slice.reducer;
