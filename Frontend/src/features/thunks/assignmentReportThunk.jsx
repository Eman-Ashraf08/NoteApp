import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const submitAssignment = createAsyncThunk(
  "assignment/submitAssignment",
  async ({ assignmentId, file, fileName, studentId }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("assignmentId", assignmentId);
      formData.append("studentId", studentId);
      formData.append("fileName", fileName);
      formData.append("file", file);

      const token = localStorage.getItem("_token");

      // Debugging log
      for (let pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
      }

      const response = await axios.post(
        "http://localhost:8000/api/submit-assignment",
        formData,
        {
          headers: {
            accessToken: token,
          },
        }
      );

      return response.data.result || { success: true };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchAssignments = createAsyncThunk(
  "assignmentReport/fetchAssignments",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("_token");

      const response = await axios.get(
        "http://localhost:8000/api/submit-assignment/all",
        {
          headers: {
            accessToken: token,
          },
        }
      );

      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);