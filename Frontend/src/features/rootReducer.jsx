import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from './slices/authSlice';
import courseReducer from './slices/courseSlice';
import assignmentReducer from './slices/assignmentSlice'
import assignmentReportReducer from './slices/assignmentReportSlice'
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'course','assignment','assignmentReport'], 
};

const rootReducer = combineReducers({
  auth: authReducer,
  course: courseReducer, 
  assignment: assignmentReducer,
  assignmentReport : assignmentReportReducer,
});

export default persistReducer(persistConfig, rootReducer);
