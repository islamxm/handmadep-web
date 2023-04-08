import { Cookies } from "typescript-cookie";
import * as _ from 'lodash';
import colors from "@/helpers/colors";
const SESSION_STORAGE = process?.browser && window?.sessionStorage   


//handmadep-web-access-token
//handmadep-web-refresh-token




const globalState = {
    token: {
        access: 
        (process?.browser && Cookies?.get('handmadep-web-access-token')) || (SESSION_STORAGE && SESSION_STORAGE.getItem('handmadep-web-access-token')) ? Cookies?.get('handmadep-web-access-token') || SESSION_STORAGE && SESSION_STORAGE.getItem('handmadep-web-access-token') : null,
        refresh: 
        (process?.browser && Cookies?.get('handmadep-web-refresh-token')) || (SESSION_STORAGE && SESSION_STORAGE.getItem('handmadep-web-refresh-token')) ? Cookies?.get('handmadep-web-refresh-token') || SESSION_STORAGE && SESSION_STORAGE.getItem('handmadep-web-refresh-token') : null,
    },
    placeholderColor: colors[_.random(colors.length)],
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