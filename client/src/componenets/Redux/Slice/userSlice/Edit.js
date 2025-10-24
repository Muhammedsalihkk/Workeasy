import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const user_edit = createAsyncThunk(
  "user/edit",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        "http://localhost/auth/user/edit_profile",
        data,
        { withCredentials: true }
      );
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.log("error",error.message);
      
      return thunkAPI.rejectWithValue(
        (error.response && error.response.data) || "Something went wrong"
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
      });
  },
});

export const { clearError } = user_edit_slice.actions;
export default user_edit_slice.reducer;
