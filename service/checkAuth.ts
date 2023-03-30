import Router from "next/router";

const checkAuth = (res: any) => {
    if(res?.status === 401) {
        Router.push('/')
    } else {
        return res?.json()
    }
}

export default checkAuth;