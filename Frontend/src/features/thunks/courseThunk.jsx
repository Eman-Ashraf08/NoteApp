import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => localStorage.getItem("_token");

export const fetchModules = createAsyncThunk(
  "course/fetchModules",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/module/${courseId}`,
        {
          headers: {
            accessToken: getToken(),
          },
        }
      );
      return response.data.result; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async Thunk to Add an Assignment to a Module
export const addAssignment = createAsyncThunk(
  "course/addAssignment",
  async (assignmentData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/assignment",
        assignmentData,
        {
          headers: {
            accessToken: getToken(),
          },
        }
      );
      
      if (response.data) {
        dispatch(fetchModules(assignmentData.module)); 
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);