import Router from "next/router";

const checkAuth = (res: any) => {
    if(res?.status === 401) {
        // Router.push('/')
        return res?.json()
    } else {
        return res?.json()
    }
}

export default checkAuth;