import { Cookies } from "typescript-cookie";



const globalState = {
    token: process?.browser && Cookies.get('handmadep-web-token') ? Cookies.get('handmadep-web-token') : null
}

const reducer = (state = globalState, action: any) => {
    switch(action.type) {
        case 'UPDATE_TOKEN':
            return {
                ...globalState,
                token: action.token
            }
        default:
            return state;
    }
}

export default reducer;