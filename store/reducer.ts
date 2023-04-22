import { Cookies } from "typescript-cookie";
import * as _ from 'lodash';
import colors from "@/helpers/colors";
const SESSION_STORAGE = process?.browser && window?.sessionStorage   


//handmadep-web-access-token
//handmadep-web-refresh-token

export type IToken = string | { [property: string]: string; } | false

export interface IGlobalState {
    token: {
        access?: IToken | null,
        refresh?: IToken | null
    },
    placeholderColor: string,
    loading: boolean,
    userData?: {
        username?: string,
        id?: number,
        email?: string
    } | null
}


const globalState: IGlobalState = {
    token: {
        access: 
        (process?.browser && Cookies?.get('handmadep-web-access-token')) || (SESSION_STORAGE && SESSION_STORAGE.getItem('handmadep-web-access-token')) ? Cookies?.get('handmadep-web-access-token') || SESSION_STORAGE && SESSION_STORAGE.getItem('handmadep-web-access-token') : null,
        refresh: 
        (process?.browser && Cookies?.get('handmadep-web-refresh-token')) || (SESSION_STORAGE && SESSION_STORAGE.getItem('handmadep-web-refresh-token')) ? Cookies?.get('handmadep-web-refresh-token') || SESSION_STORAGE && SESSION_STORAGE.getItem('handmadep-web-refresh-token') : null,
    },
    placeholderColor: colors[_.random(colors.length)],
    loading: false,
    userData: null

}

const reducer = (state = globalState, action: any) => {
    switch(action.type) {
        case 'UPDATE_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'UPDATE_LOADING':
            return {
                ...state,
                loading: action.loading
            }
        case 'UPDATE_USER_DATA':
            return {
                ...state,
                userData: action.data
            }
        default:
            return state;
    }
}

export default reducer;