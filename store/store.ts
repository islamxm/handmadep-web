import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import mainSlice from './slices/mainSlice'
import apiSlice from './slices/apiSlice';

const store = configureStore({
    reducer: {
        main: mainSlice, 
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process?.env?.NODE_ENV !== 'production'
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;