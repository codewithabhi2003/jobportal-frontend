import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        savedJobs: [], // ✅ ADD THIS
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setSavedJobs: (state, action) => {
  state.savedJobs = action.payload;
},


        // ✅ NEW REDUCER
        toggleSaveJob: (state, action) => {
    // 🔒 SAFETY: ensure array always exists
    if (!Array.isArray(state.savedJobs)) {
        state.savedJobs = [];
    }

    const job = action.payload;
    const exists = state.savedJobs.some(j => j._id === job._id);

    if (exists) {
        state.savedJobs = state.savedJobs.filter(j => j._id !== job._id);
    } else {
        state.savedJobs.push(job);
    }
},

    },
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    setSavedJobs,
    toggleSaveJob, // ✅ EXPORT
} = jobSlice.actions;

export default jobSlice.reducer;
