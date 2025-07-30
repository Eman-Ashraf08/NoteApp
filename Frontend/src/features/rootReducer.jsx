import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from './slices/authSlice';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export default persistReducer(persistConfig, rootReducer);
