import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducer/authslice.js';

export const store = configureStore({
    reducer: {
       auth: authSlice,
    },
})


