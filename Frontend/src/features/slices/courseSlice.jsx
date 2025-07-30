import { createSlice } from "@reduxjs/toolkit";
import {fetchModules} from '../thunks/courseThunk'
const courseSlice = createSlice({
  name: "course",
  initialState: {
    course: null, 
    modules: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        state.loading = false;
        state.modules = action.payload;
      })
      .addCase(fetchModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCourse } = courseSlice.actions;
export default courseSlice.reducer;
