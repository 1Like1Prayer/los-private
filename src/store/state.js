import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import marketSlice from "./marketSlice";


export const store = configureStore({
    reducer: {
        user:userSlice,
        cart:marketSlice
    }
})