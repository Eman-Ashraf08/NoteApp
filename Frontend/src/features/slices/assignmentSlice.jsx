import { createSlice } from "@reduxjs/toolkit";
import { fetchAssignments } from "../thunks/assignmentThunk";

const assignmentSlice = createSlice({
  name: "assignment",
  initialState: {
    assignments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default assignmentSlice.reducer;
