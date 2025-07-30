import { createSlice } from "@reduxjs/toolkit";
import { fetchUserLogin } from "../thunks/authThunk";

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

      // Optional: remove token from localStorage
      localStorage.removeItem("_token");
    },
  },
  extraReducers: (builder) => {
    builder
      // user Login
      .addCase(fetchUserLogin.pending, (state) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.user = action.payload; // action.payload = user
        state.status = "succeeded";
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
