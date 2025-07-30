// src/features/thunks/assignmentThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch assignments by student ID (all modules from enrolled courses)
export const fetchAssignments = createAsyncThunk(
  "assignment/fetchAssignments",
  async (studentId, thunkAPI) => {
    try {
      const token = localStorage.getItem("_token");
      const response = await axios.get(
        `http://localhost:8000/api/assignment/student/${studentId}`,
        {
          headers: { accessToken: token },
        }
      );
      return response.data.result || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Fetch assignments by module ID
export const fetchAssignmentsByModule = createAsyncThunk(
  "assignment/fetchAssignmentsByModule",
  async (moduleId, thunkAPI) => {
    try {
      const token = localStorage.getItem("_token");
      const response = await axios.get(
        `http://localhost:8000/api/assignment/module/${moduleId}`,
        {
          headers: { accessToken: token },
        }
      );
      return response.data.result || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);


