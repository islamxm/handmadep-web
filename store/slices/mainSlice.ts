import { createSlice } from "@reduxjs/toolkit";
import { globalState } from "../reducer";
import Tokens from "@/models/Tokens";


const mainSlice = createSlice({
    name: 'main',
    initialState: globalState,
    reducers: {
        main_updateToken: (state, {payload}:{payload:Tokens}) => {
            state.token = payload
        },
        main_deleteToken: (state) => {
            state.token = {
                access: null,
                refresh: null
            }
        },
        main_updateLoading: (state, action) => {
            state.loading = action.payload
        },
        main_updateAuthPopup: (state, action) => {
            state.authPopup = action.payload
        },
        main_updateSignupPopup: (state, action) => {
            state.signupPopup = action.payload
        },
        main_openSearch: (state) => {
            state.searchPopup = true
        },
        main_closeSearch: (state) => {
            state.searchPopup = false
        },
        main_updateCurrentProduct: (state, action) => {
            state.currentProduct = action.payload
        },
        main_updateResetPassPopup: (state, action) => {
            state.resetPassPopup = action.payload
        },
        main_updateUserData: (state, action) => {
            state.userData = action.payload
        }
    }
})

const {reducer, actions} = mainSlice

export default reducer
export const {
    main_updateToken,
    main_deleteToken,
    main_updateLoading,
    main_updateAuthPopup,
    main_updateSignupPopup,
    main_closeSearch,
    main_openSearch,
    main_updateCurrentProduct,
    main_updateResetPassPopup,
    main_updateUserData
} = actions