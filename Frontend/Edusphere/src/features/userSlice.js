import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async thunk to fetch user profile from API
// export const fetchUserProfile = createAsyncThunk(
//     "user/fetchProfile",
//     async (_, { rejectWithValue }) => {
//         try {
//             const token = localStorage.getItem("token");
//             const response1 = await axios.get(
//                 `${import.meta.env.VITE_BASE_URL}/students/profile`,
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );

//             const teacher_token = localStorage.getItem("teacher_token");
//             const response2 = await axios.get(
//                 `${import.meta.env.VITE_BASE_URL}/teachers/profile`,
//                 {
//                     headers: { Authorization: `Bearer ${teacher_token}` },
//                 }
//             );

//             return response1.data || response2.data;
//         } catch (error) {
//             console.error("Error fetching profile:", error.response?.data); // Debugging log
//             return rejectWithValue(error.response?.data || "Failed to fetch profile");
//         }
//     }
// );
export const fetchUserProfile = createAsyncThunk(
    "user/fetchProfile",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const teacher_token = localStorage.getItem("teacher_token");

            // Create API calls
            const studentRequest = token
                ? axios.get(`${import.meta.env.VITE_BASE_URL}/students/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                : null;

            const teacherRequest = teacher_token
                ? axios.get(`${import.meta.env.VITE_BASE_URL}/teachers/profile`, {
                    headers: { Authorization: `Bearer ${teacher_token}` },
                })
                : null;

            // Execute API calls in parallel
            const [studentResponse, teacherResponse] = await Promise.allSettled([
                studentRequest,
                teacherRequest,
            ]);
            const studentData =
                studentResponse.status === "fulfilled" ? studentResponse.value?.data : null;
            const teacherData =
                teacherResponse.status === "fulfilled" ? teacherResponse.value?.data : null;
            if (studentData) return studentData;
            if (teacherData) return teacherData;

            throw new Error("No user data found");
        } catch (error) {
            console.error("Error fetching profile:", error.message);
            return rejectWithValue(error.message || "Failed to fetch profile");
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
