import { createSlice } from "@reduxjs/toolkit";
import { fetchUserLogin, userUpdateProfile } from "../thunks/authThunk";

const initialState = {
  loading: false,
  user: null,
  error: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = "idle";
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // user Login
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserLogin.pending, (state) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })
      
    //  userupdateprofile
      .addCase(userUpdateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.loading = false;
        state.error = null;
      })
      .addCase(userUpdateProfile.pending, (state) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(userUpdateProfile.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;