import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoading: true
    },

    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
            state.isLoading = false // true  krne pr loadin pr atak rha hai and false mai jb user logi hota hai to reload krne pr login page show hota hai 1 ya 1 milisec ke liye
        },
        removeUser: (state) => {
            state.user = null
            state.isLoading = false
        }
    }
})

export const { addUser, removeUser } = authSlice.actions;
