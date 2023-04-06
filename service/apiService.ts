import { endpoints } from "./endpoints";
import axios from "axios";
import checkAuth from "./checkAuth";
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
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    // ** Получение информации о себе
    getSelf = async () => {
        try {
            let res = await fetch(endpoints.me, {
                method: 'GET',
                headers
            })

            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }


    // ** Изменение данных о себе
    editSelf = async (body: {
        username?: string,
    }) => {
        try {
            let res = await fetch(endpoints.me, {
                method: 'PUT',
                headers,
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

            return await checkAuth(res)
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

}


export default ApiService;