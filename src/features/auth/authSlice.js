import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    loading: false,
    error: null
}

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const {data} = await axios.post("http://localhost:8080/api/auth/login", { email, password });
            localStorage.setItem("userInfo", JSON.stringify(data));
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Login Error")
        }
    }
);
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const {data} = await axios.post("http://localhost:8080/api/auth/register", { name, email, password });
            localStorage.setItem("userInfo", JSON.stringify(data));
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Register Error")
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.userInfo = null,
                localStorage.removeItem("userInfo")
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;