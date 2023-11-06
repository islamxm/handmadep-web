import { 
  configureStore, 
  createStore, 
  getDefaultMiddleware,
  ThunkAction,
  Action
} from "@reduxjs/toolkit";
import mainSlice from './slices/mainSlice'
import apiSlice from './slices/apiSlice';
import { createWrapper } from "next-redux-wrapper";

const makeStore = () => configureStore({
    reducer: {
        main: mainSlice, 
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: false,
    })
    .concat(apiSlice.middleware),
    devTools: process?.env?.NODE_ENV !== 'production'
})


const store = createWrapper<AppStore>(makeStore, {debug: true})


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch'];
export default store;