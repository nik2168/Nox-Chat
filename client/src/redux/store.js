import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducer/authslice.js';
import api from './api/api.js';

export const store = configureStore({
    reducer: {
       auth: authSlice.reducer,
       api: api.reducer,
    },
    middleware: (defaultMiddleware) => [...defaultMiddleware(), api.middleware],
})


