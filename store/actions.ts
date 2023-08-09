export const updateToken = (token: {access: string | null, refresh: string | null}) => ({type: 'UPDATE_TOKEN', token})
export const updateLoading = (loading: boolean) => ({type: 'UPDATE_LOADING', loading})
export const updateUserData = (data: any) => ({type: 'UPDATE_USER_DATA', data})
export const updateAuthPopup = (value: boolean) => ({type: 'UPDATE_AUTH_POPUP', value})
export const updateSignupPopup = (value: boolean) => ({type: 'UPDATE_SIGNUP_POPUP', value})
export const updateCurrentProduct = (value: any) => ({type: 'UPDATE_CURRENT_PRODUCT', value})


export const openSearch = () => ({type: 'OPEN_SEARCH'})
export const closeSearch = () => ({type: 'CLOSE_SEARCH'})