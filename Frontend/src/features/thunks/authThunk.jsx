import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../api/apiPool";

// Fetch Login
export const fetchUserLogin = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const { user, token } = await userAPI.UserLogin(data);
      return user; // only returning user
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);
