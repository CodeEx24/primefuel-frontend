import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default is localStorage
import authReducer from '@/shared/lib/features/authSlice';
import paginationReducer from '@/shared/lib/features/paginationSlice';
import { apiSlice } from '@/pages/api/apiSlice';
import { combineReducers } from 'redux';

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only auth and pagination will be persisted
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer, // exact name
  pageDetails: paginationReducer, // exact name
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
        ],
        // Ignore these paths in the state
        ignoredPaths: ['persist.purged'],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
