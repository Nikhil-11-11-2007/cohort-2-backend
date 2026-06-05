import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IResume } from "@/types/resume.types";

const resumeSlice = createSlice({
    name: "resume",

    initialState: {
        resume: null as IResume | null,
        loading: false,
        error: null as string | null,
    },

    reducers: {
        setResume: (
            state,
            action: PayloadAction<IResume | null>
        ) => {
            state.resume = action.payload;
        },

        setResumeLoading: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.loading = action.payload;
        },

        setResumeError: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.error = action.payload;
        },
    },
});

export const {
    setResume,
    setResumeLoading,
    setResumeError,
} = resumeSlice.actions;

export default resumeSlice.reducer;