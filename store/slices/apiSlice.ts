import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_DOMAIN, endpoints } from '@/service/endpoints';
import { AuthBody } from '@/models/AuthBody';
import {headers} from '@/service/apiService';
import { IToken } from '../reducer';
import ReportReasons from '@/models/ReportReasons';

const setHeaderWithToken = (token: any) => ({...headers,'Authorization': `JWT ${token}`})

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: BASE_DOMAIN}),
    endpoints: builder => ({

        auth: builder.mutation({
            query: (body: AuthBody) => ({
                url: endpoints.getTokens,
                method: "POST",
                headers,
                body: JSON.stringify(body),
            })
        }),

        authGoogle: builder.query({
            query: () => `https://handmadep.com/api/auth/o/google-oauth2/?redirect_uri=https://handmadep.com/google`
        }),

        authGoogleToken: builder.mutation({
            query: (body: {
                code?: string | string[],
                state?: string | string[]
            }) => ({
                url: endpoints.authO + `google-oauth2/`,
                method: "POST",
                headers,
                body: JSON.stringify(body)
            })
        }),

        resetPassword: builder.mutation({
            query: (body: {
                email: string
            }) => ({
                url: endpoints.resetPassword,
                method: "POST",
                headers,
                body: JSON.stringify(body)
            }),
            
        }),

        getUserData: builder.query({
            query: (token) => ({
                url: endpoints.me,
                headers: setHeaderWithToken(token)
            })
        }),

        getSimilarProds: builder.query({
            query: ({
                page, 
                card_pk,
                per_page = 20
            }:{
                page: number, 
                card_pk: string | string[] | undefined, 
                per_page?: number
            }) => ({
                url: endpoints.getSimilarProducts + `/${card_pk}?p=${page}&per_page=${per_page}`,
                headers
            })
        }),

        reportProduct: builder.mutation({
            query: ({token, body}: { 
                token: any,
                body: {
                    report_reason: ReportReasons,
                card: string | number
                }   
            }) => ({
                url: endpoints.onReport,
                method: "POST",
                headers: setHeaderWithToken(token),
                body:JSON.stringify(body),
            })
        })
    }),
})


export default apiSlice;

export const {
    useAuthMutation,
    useAuthGoogleQuery,
    useAuthGoogleTokenMutation,
    useResetPasswordMutation,
    useGetUserDataQuery, 
    useGetSimilarProdsQuery,
    useReportProductMutation
    } = apiSlice

