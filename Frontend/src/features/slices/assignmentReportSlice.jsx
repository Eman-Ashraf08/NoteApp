import { createSlice } from "@reduxjs/toolkit";
import { submitAssignment, fetchAssignments } from "../thunks/assignmentReportThunk";

const assignmentReportSlice = createSlice({
  name: "assignmentReport",
  initialState: {
    loading: false,
    error: null,
    success: false,
    assignments: [],
  },
  reducers: {
    clearStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitAssignment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
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
      });
  },
});

export const { clearStatus } = assignmentReportSlice.actions;
export default assignmentReportSlice.reducer;