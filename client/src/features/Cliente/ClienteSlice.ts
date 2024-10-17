import { createSlice } from "@reduxjs/toolkit";

export const clienteSlice = createSlice({
    name: 'cliente',
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
