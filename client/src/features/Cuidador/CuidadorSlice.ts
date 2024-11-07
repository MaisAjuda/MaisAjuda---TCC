import { createSlice } from "@reduxjs/toolkit";

export const cuidadorSlice = createSlice({
    name: 'cuidador',
    initialState: {
        user: null,
        isLogged: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
})
