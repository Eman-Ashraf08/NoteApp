import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => localStorage.getItem("_token");

// Fetch all notes for a user
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/notes/user/${userId}`,
        {
          headers: {
            accessToken: getToken(),
          },
        }
      );
      return response.data.notes;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add a new note
export const addNote = createAsyncThunk(
  "notes/addNote",
  async (noteData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in noteData) {
        const value = noteData[key];
        if (key === "image") {
          if (value && typeof value === "object") {
            formData.append("image", value);
          }
          // Don't append if image is empty or a string (URL)
        } else if (value !== undefined && value !== "") {
          formData.append(key, value);
        }
      }

      const response = await axios.post("http://localhost:8000/api/notes", formData, {
        headers: {
          accessToken: getToken(),
        },
      });

      return response.data.note;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update an existing note
export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async (payload, { rejectWithValue }) => {
    try {
      const { id, ...fields } = payload;
      const formData = new FormData();
      for (const key in fields) {
        let value = fields[key];
        if (key === "image") {
          if (value === "") {
            formData.append("image", ""); // remove image
          } else if (value instanceof File) {
            formData.append("image", value); // update image
          }
          // Do NOT send image field if not updating image
        } else if (value !== undefined && value !== "") {
          // Always append as string
          if (Array.isArray(value)) {
            value = value.join(",");
          }
          formData.append(key, String(value));
        }
      }

      const response = await axios.patch(
        `http://localhost:8000/api/notes/${id}`,
        formData,
        {
          headers: {
            accessToken: getToken(),
            // Do NOT set Content-Type for FormData, axios will handle it
          },
        }
      );

      return response.data.note;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a note
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8000/api/notes/${id}`, {
        headers: {
          accessToken: getToken(),
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);