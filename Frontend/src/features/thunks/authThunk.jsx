import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../api/apiPool";

// Fetch Login
export const fetchUserLogin = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userAPI.UserLogin(data);
      const { data: userData, headers } = response;
      const serializedHeaders = {
        contentLength: headers["content-length"],
        contentType: headers["content-type"],
      };

      return { 
        data: userData, 
        headers: serializedHeaders 
      };
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// userupdateprofile
export const userUpdateProfile = createAsyncThunk(
  "auth",
  async ({ data, auth }, { rejectWithValue }) => { 
    try {
      const response = await userAPI.UserUpdateProfile(data, auth);
      // Extract and serialize the necessary fields
      const { data: userData, headers } = response;
      const serializedHeaders = {
        contentLength: headers["content-length"],
        contentType: headers["content-type"],
      };

      return { data: userData, headers: serializedHeaders }; // Return serialized payload
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

