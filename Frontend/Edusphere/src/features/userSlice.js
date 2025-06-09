import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfile = createAsyncThunk(
    "user/fetchProfile",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const teacher_token = localStorage.getItem("teacher_token");

            const promises = [];

            if (token) {
                promises.push(
                    axios.get(`${import.meta.env.VITE_BASE_URL}/students/profile`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                );
            }

            if (teacher_token) {
                promises.push(
                    axios.get(`${import.meta.env.VITE_BASE_URL}/teachers/profile`, {
                        headers: { Authorization: `Bearer ${teacher_token}` },
                    })
                );
            }

            if (promises.length === 0) {
                throw new Error("No token found");
            }

            const result = await Promise.any(promises);
            return result.data;

        } catch (error) {
            console.error("Error fetching profile:", error.message);
            return rejectWithValue(error.message || "Failed to fetch profile");
        }
    }
);

const initialState = {
    user: null,
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;  // Store fetched user profile
                state.loading = false;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                console.error("Profile fetch failed:", action.payload);
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
