import { deauthorizeFunc } from "@/helpers/authorizeUtils";

const checkAuth = (res: Response, noparse?: boolean) => {
    if(res?.status === 401) {
        deauthorizeFunc()
    } else {
        if(noparse) {
            return res
        } else {
            return res?.json()
        }
        
    }
}

export default checkAuth;