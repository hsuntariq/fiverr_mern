import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice'
export const store = configureStore({
    reducer: {
        auth: userReducer
    }
});
