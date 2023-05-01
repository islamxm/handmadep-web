import { endpoints } from "./endpoints";
import axios from "axios";
import checkAuth from "./checkAuth";
import { IToken } from "@/store/reducer";

const headers = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
}



class ApiService {



    // ** Регистрация нового юзера
    register = async (body: {
        email: string,
        password: string,
        username: string,
        re_password: string
    }) => {
        try {
            let res = await fetch('https://handmadep.com/api/users/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(body),
            })
            return await res
        } catch(err) {
            console.log(err)
        }
    }


    // ** Получение информации о себе
    getSelf = async (token: IToken) => {
        try {
            let res = await fetch(endpoints.me, {
                method: 'GET',
                headers: {
                    ...headers,
                    'Authorization': `JWT ${token}`
                }
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }


    // ** Изменение данных о себе
    editSelf = async (body: {
        username?: string,
        email?: string,
        about?: string,
        image?: string,
        site?: string
    }, token: IToken) => {
        try {
            let res = await fetch(endpoints.me, {
                method: 'PUT',
                headers: {
                    ...headers,
                    'Authorization': `JWT ${token}`
                },
                body: JSON.stringify(body)
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }


    // ** Получить токены (access, refresh)
    getTokens = async (body: {
        email?: string,
        password?: string
    }) => {
        try {
            let res = await fetch(endpoints.getTokens, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            })
            // return await checkAuth(res)
            return await res
        } catch(err) {
            console.log(err)
        }
    } 


    // ** Обновить токены (access, refresh)
    updateTokens = async (refresh?: string) => {
        try {
            let res = await fetch(endpoints.updateTokens, {
                method: 'POST',
                headers,
                body: JSON.stringify({refresh})
            })
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }


    // ** Проверка актуальности токена
    verifyToken = async (token?: string) => {
        try {
            let res = await fetch(endpoints.verifyToken, {
                method: 'POST',
                headers,
                body: JSON.stringify({token})
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }


    // ** Авторизация через соц.сети
    authExternal = async (provider?: string) => {
        try {
            let res = await fetch(endpoints.authExternal(provider), {
                method: 'POST',
                headers,
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }


    // ** Получить товары
    getCardsList = async (page: number) => {
        try {
            let res = await fetch(endpoints.cardsList + `?p=${page}`, {
                method: 'GET',
                headers
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    } 



    // ** Получить конкретный товар
    getProduct = async (id?: string | string[]) => {
        try {
            let res = await fetch(endpoints.cardsList + id, {
                method: 'GET',
                headers
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }



    // ** поставить лайк
    productLike = async (id: string | number, token: IToken) => {
        try {
            let res = await fetch(endpoints.productLike(id), {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `JWT ${token}`
                }
            })

            return await checkAuth(res, true)
        } catch(err) {
            console.log(err)
        }
    }

    // ** удалить лайк
    productUnlike = async (id: string | number, token: IToken) => {
        try {
            let res = await fetch(endpoints.productLike(id), {
                method: 'DELETE',
                headers: {
                    ...headers,
                    'Authorization': `JWT ${token}`
                }
            })
            return await checkAuth(res, true)
        } catch(err) {
            console.log(err)
        }
    }

    // ** сохранить
    productSave = async (id: string | number, token: IToken) => {
        try {
            let res = await fetch(endpoints.productSave(id), {
                method: 'POST',
                headers: {
                    ...headers,
                    'Authorization': `JWT ${token}`
                }
            })
            return await checkAuth(res, true)
        } catch(err) {
            console.log(err)
        }
    }

    // ** удалить из сохраненных
    productUnsave = async (id: string | number, token: IToken) => {
        try {
            let res = await fetch(endpoints.productSave(id), {
                method: 'DELETE',
                headers: {
                    ...headers,
                    'Authorization': `JWT ${token}`
                }
            })
            return await checkAuth(res, true)
        } catch(err) {
            console.log(err)
        }
    }
}


export default ApiService;