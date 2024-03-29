import { Cookies } from "typescript-cookie"
import { cookiesStorageKeys } from "./storageKeys"

interface I {
    (tokens: {
        access: string, 
        refresh: string
    }):void
}

export const deauthorizeFunc = () => {
    console.log('DEAUTHORIZE')
    Cookies.remove(cookiesStorageKeys.TOKEN_ACCESS)
    Cookies.remove(cookiesStorageKeys.TOKEN_REFRESH)
    window.location.replace('/')
}

export const authorizeFunc:I = (tokens) => {
    Cookies.set(
        cookiesStorageKeys.TOKEN_ACCESS, 
        tokens?.access, 
        {
            expires: 100
        })
    Cookies.set(
        cookiesStorageKeys.TOKEN_REFRESH, 
        tokens?.refresh, 
        {
            expires: 100
        })
}

