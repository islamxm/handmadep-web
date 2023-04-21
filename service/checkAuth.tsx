const checkAuth = (res: Response) => {
    if(res.status === 401) {
        window.location.replace('/')
    } else {
        return res.json()
    }
}