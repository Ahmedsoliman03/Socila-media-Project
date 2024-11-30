import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/loginSlices";

export let store = configureStore({
    reducer: {
        authReducer
    }
})

export type storeDispatch = typeof store.dispatch;
export type storeState = ReturnType<typeof store.getState>; 