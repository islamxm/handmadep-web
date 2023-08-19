import { Cookies } from "typescript-cookie"
import { cookiesStorageKeys } from "./storageKeys"

interface I {
    (tokens: {
        access: string, 
        refresh: string
    }):void
}


const authorizeFunc:I = (tokens) => {
    Cookies.set(cookiesStorageKeys.TOKEN_ACCESS, tokens?.access, {expires: 100})
    Cookies.set(cookiesStorageKeys.TOKEN_REFRESH, tokens?.refresh, {expires: 100})
}

export default authorizeFunc;