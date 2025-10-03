import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice.js'
import todosReducer from '../features/todo/todoSlice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todosReducer,
    }
});