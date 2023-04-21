export const BASE_DOMAIN = `https://handmadep.com/api/`;
export const PATH = `${BASE_DOMAIN}`;


export const endpoints = {

    // *TODO Эндпоинты для теста

    // ===============================================================================================================================
    
    // ** Основные эндпоинты

    auth: `${PATH}users/`,
    //POST - создать пользователя
    //GET - получить список всех пользователей (только для админа)
    me: `${PATH}users/me/`,
    //GET - получить инфу о себе
    //PUT - изменение данных о себе
    //PATCH - частичное изменение данных о себе
    //DEL - удаление себя
    user: (id: string) => `${PATH}users/${id}/`,
    //GET
    //PUT
    //PATCH
    getTokens: `${PATH}auth/jwt/create/`,
    updateTokens: `${PATH}auth/jwt/refresh/`,
    //access token expire - 60 min
    //refresh token expire - 1 day
    verifyToken: `${PATH}jwt/verify/`,
    //проверка актуальности токена
    authExternal: (provider: any) => `${PATH}/o/${provider}/`,
    //авторизация через соцсети
    cardsList: `${PATH}cards/`,
    //GET - получиение списка товаров

}