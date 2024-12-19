import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/loginSlices";
import { postReducer } from "./slices/allPosts";
import { PassReducer } from "./slices/changePass";

export const store = configureStore({
    reducer: {
        authReducer,
        postReducer,
        PassReducer
    }
})

export type storeDispatch = typeof store.dispatch;
export type storeState = ReturnType<typeof store.getState>; 