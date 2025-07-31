import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from './slices/authSlice';
import notesReducer from './slices/notesSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'notes'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  notes: notesReducer,
});

export default persistReducer(persistConfig, rootReducer);
