import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/loginSlices";
import { postReducer } from "./slices/allPosts";

export const store = configureStore({
    reducer: {
        authReducer,
        postReducer
    }
})

export type storeDispatch = typeof store.dispatch;
export type storeState = ReturnType<typeof store.getState>; 