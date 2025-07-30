import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default is localStorage
import rootReducer from './features/rootReducer';

// Persist configuration
const persistConfig = {
  key: 'root', // Key for storage
  storage, // Storage type (localStorage or sessionStorage)
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for Redux Persist
    }),
});

// Create a persistor instance
export const persistor = persistStore(store);

// Export types for dispatch and state
export const AppDispatch = store.dispatch;
export const RootState = store.getState;
