import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/types/user.types";

const authSlice = createSlice({
    name: "auth",

    initialState: {
        user: null as IUser | null,
        loading: false,
        error: null as string | null,
    },

    reducers: {
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
        },

        setAuthLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        setAuthError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

    },
});

export const {
    setUser,
    setAuthLoading,
    setAuthError,
} = authSlice.actions;

export default authSlice.reducer;