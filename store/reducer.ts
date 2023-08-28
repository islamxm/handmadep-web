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
        email?: string,
        about?: string,
        image?: string,
        site?: string,
        avatar_url?: string,
        avatar_image?: any
    } | null,
    authPopup: boolean,
    signupPopup: boolean,
    resetPassPopup: boolean,
    searchPopup: boolean,
    currentProduct: any,

    cachedCards: {
        currentPage: number,
        list: any[]
    } | null
}


export const globalState: IGlobalState = {
    token: {
        access: 
        (process?.browser && Cookies?.get('handmadep-web-access-token')) || (SESSION_STORAGE && SESSION_STORAGE.getItem('handmadep-web-access-token')) ? Cookies?.get('handmadep-web-access-token') || SESSION_STORAGE && SESSION_STORAGE.getItem('handmadep-web-access-token') : null,
        refresh: 
        (process?.browser && Cookies?.get('handmadep-web-refresh-token')) || (SESSION_STORAGE && SESSION_STORAGE.getItem('handmadep-web-refresh-token')) ? Cookies?.get('handmadep-web-refresh-token') || SESSION_STORAGE && SESSION_STORAGE.getItem('handmadep-web-refresh-token') : null,
    },
    placeholderColor: colors[_.random(colors.length)],
    loading: false,
    userData: null,
    authPopup: false,
    signupPopup: false,
    resetPassPopup: false,
    searchPopup: false,
    currentProduct: null,
    cachedCards: null
}

