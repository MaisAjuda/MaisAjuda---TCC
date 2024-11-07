import { configureStore } from "@reduxjs/toolkit";
import { clienteSlice } from "../features/Cliente/ClienteSlice";
import { cuidadorSlice } from "../features/Cuidador/CuidadorSlice";

export const store = configureStore({
    reducer: {
        cliente: clienteSlice.reducer,
        cuidador: cuidadorSlice.reducer
    }

})