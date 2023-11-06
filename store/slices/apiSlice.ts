import { 
	buildCreateApi,
  coreModule,
  reactHooksModule,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { BASE_DOMAIN, endpoints } from '@/service/endpoints';
import { AuthBody } from '@/models/AuthBody';
import { headers } from '@/service/apiService';
import checkAuth from "@/helpers/checkAuth";
import ReportReasons from '@/models/ReportReasons';
import { HYDRATE } from 'next-redux-wrapper';


const createApi = buildCreateApi(
	coreModule(),
	reactHooksModule({ unstable__sideEffectsInRender: true })
)


const setHeaderWithToken = (token: any) => {
	if(token) {
		return { ...headers, 'Authorization': `JWT ${token}` }
	} else {
		return headers
	}
}


const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_DOMAIN }),
	extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
	endpoints: builder => ({

		auth: builder.mutation({
			query: (body: AuthBody) => ({
				url: endpoints.getTokens,
				method: "POST",
				headers,
				body: JSON.stringify(body),
			})
		}),

		refresh: builder.mutation({
			query: (body: {refresh: any}) => ({
				url: endpoints.refresh,
				method: "POST",
				headers,
				body: JSON.stringify(body)
			})
		}),

		authGoogle: builder.query({
			query: () => `https://handmadep.com/api/auth/o/google-oauth2/?redirect_uri=https://handmadep.com`
		   }),
		 
		   authGoogleToken: builder.mutation({
			query: (body: {
			 code?: string | string[],
			 state?: string | string[]
			}) => {
			 let url = new URL(endpoints.authO + `google-oauth2/`);
										 let code = Array.isArray(body.code!) ? body.code![0] : body.code!;
			 let state = Array.isArray(body.state!) ? body.state![0] : body.state!;
			 url.searchParams.append('code', code);
			 url.searchParams.append('state', state);
			 return {
			  url: url.toString(),
			  method: "POST",
			  headers,
			  body: JSON.stringify(body)
			 }
			}
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
			}),
			transformErrorResponse: (res) => checkAuth(res.status)
		}),

		getCards: builder.query({
			query: ({
				token,
				body: {
					last_id
				}
			}: {
				token?:any,
				body: {
					last_id?: number | string
				}
			}) => ({
				url: endpoints.cardsList + `?last_id=${last_id || 0}`,
				headers: setHeaderWithToken(token)
			}),
		}),

		getProduct: builder.query({
			query: ({
				token,
				id
			}: {
				token?: any,
				id: number | string
			}) => ({
				url: endpoints.cardsList + `/${id}`,
				headers: setHeaderWithToken(token)
			}),
			transformErrorResponse: (res) => checkAuth(res.status)
		}),

    getSimilarProds: builder.query({
			query: ({
				last_id = 0,
				card_pk,
				token
			}: {
				last_id: number,
				card_pk: any,
				per_page?: number,
				token?: any
			}) => ({
				url: endpoints.getSimilarProducts + `/${card_pk}?last_id=${last_id}`,
				headers: setHeaderWithToken(token)
			}),
			transformErrorResponse: (res) => checkAuth(res.status)
		}),

		reportProduct: builder.mutation({
			query: ({ token, body }: {
				token: any,
				body: {
					report_reason: ReportReasons,
					card: string | number
				}
			}) => ({
				url: endpoints.onReport,
				method: "POST",
				headers: setHeaderWithToken(token),
				body: JSON.stringify(body),
			}),
			transformErrorResponse: (res) => checkAuth(res.status)
		}),

		search: builder.query({
			query: ({query_string, last_id, token}: {
				query_string?:any,
				last_id?: number,
				token?: any
			}) => ({
				url: endpoints.search + `?query_string=${query_string}&last_id=${last_id = 0}`,
				headers: setHeaderWithToken(token)
			}),
		}),

		getFavs: builder.query({
			query: ({page,per_page = 10, token}: {
				page: number,
				per_page?: number ,
				token:any
			}) => ({
				url: endpoints.getFavs + `?p=${page}`,
				headers: setHeaderWithToken(token)
			})
		}),

		getLikes: builder.query({
			query: ({page, per_page = 10, token}: {
				page: number,
				per_page?: number,
				token:any
			}) => ({
				url: endpoints.getLikes + `?p=${page}`,
				headers: setHeaderWithToken(token)
			})
		}),

		setFeedback: builder.query({
			query: (body: {
				email: string,
				feedback_text: string
			}) => ({
				url: endpoints.feedback,
				headers,
				method: "POST",
				body: JSON.stringify(body)
			})
		}),

		deleteAccount: builder.mutation({
			query: (token:any) => ({
				url: endpoints.me,
				method: "DELETE",
				headers: setHeaderWithToken(token)
			})
		})

	}),
})


export default apiSlice;

export const {
	useRefreshMutation,
	useAuthMutation,
	useAuthGoogleQuery,
	useAuthGoogleTokenMutation,
	useResetPasswordMutation,
	useGetUserDataQuery,
	useGetSimilarProdsQuery,
	useReportProductMutation,
	useGetCardsQuery,
	useGetProductQuery,
	useSearchQuery,
	useGetLikesQuery,
	useSetFeedbackQuery,
	useDeleteAccountMutation,
	util: {getRunningQueriesThunk}
} = apiSlice

