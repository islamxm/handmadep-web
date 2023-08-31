import { Cookies } from "typescript-cookie";
import Router from 'next/router';

const checkAuth = (res: Response, noparse?: boolean) => {

    if(res?.status === 401) {
        Cookies.remove('handmadep-web-access-token')
        Cookies.remove('handmadep-web-refresh-token')
        if(process?.browser) {
            sessionStorage.removeItem('handmadep-web-access-token')
            sessionStorage.removeItem('handmadep-web-refresh-token')
            // window.location.replace('/')
            Router.replace('/')
        }
    } else {
        if(noparse) {
            return res
        } else {
            return res?.json()
        }
        
    }
}

export default checkAuth;