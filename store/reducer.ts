import { Cookies } from "typescript-cookie";



const globalState = {
    token: {
        access: process?.browser && Cookies.get('handmadep-web-access-token') ? Cookies.get('handmadep-web-access-token') : null,
        refresh: process?.browser && Cookies.get('handmadep-web-refresh-token') ? Cookies.get('handmadep-web-refresh-token') : null
    },
    loading: false
}

const reducer = (state = globalState, action: any) => {
    switch(action.type) {
        case 'UPDATE_TOKEN':
            return {
                ...globalState,
                token: action.token
            }
        case 'UPDATE_LOADING':
            return {
                ...globalState,
                loading: action.loading
            }
        default:
            return state;
    }
}

export default reducer;