export const updateToken = (token: {access: string | null, refresh: string | null}) => ({type: 'UPDATE_TOKEN', token})
export const updateLoading = (loading: boolean) => ({type: 'UPDATE_LOADING', loading})
export const updateUserData = (data: any) => ({type: 'UPDATE_USER_DATA', data})