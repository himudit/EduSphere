// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async function to fetch user profile from API
// export const fetchUserProfile = createAsyncThunk(
//     "user/fetchProfile",
//     async (_, { rejectWithValue }) => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/students/profile`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             return response.data; // Return the user profile data
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Failed to fetch profile");
//         }
//     }
// );

// const initialState = {
//     user: null, // Store a single user object
//     loading: false,
//     error: null,
// };

// export const userSlice = createSlice({
//     name: "user",
//     initialState,
//     reducers: {
//         logoutUser: (state) => {
//             state.user = null; // Clear user data on logout
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchUserProfile.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchUserProfile.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.user = action.payload; // Store user profile
//             })
//             .addCase(fetchUserProfile.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export const { logoutUser } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async thunk to fetch user profile from API
export const fetchUserProfile = createAsyncThunk(
    "user/fetchProfile",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/students/profile`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            return response.data;
        } catch (error) {
            console.error("Error fetching profile:", error.response?.data); // Debugging log
            return rejectWithValue(error.response?.data || "Failed to fetch profile");
        }
    }
);

// ✅ Initial state
const initialState = {
    user: null,  // Stores the logged-in user profile
    loading: false,
    error: null,
};

// ✅ Create user slice
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

// ✅ Export actions
export const { addUser, removeUser } = userSlice.actions;

// ✅ Export reducer
export default userSlice.reducer;
