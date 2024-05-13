import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducer/authslice.js';
import api from './api/api.js';
import miscSlice from './reducer/miscslice.js';

export const store = configureStore({
    reducer: {
       auth: authSlice.reducer,
       misc: miscSlice.reducer,
       api: api.reducer,
    },
    middleware: (defaultMiddleware) => [...defaultMiddleware(), api.middleware],
})


