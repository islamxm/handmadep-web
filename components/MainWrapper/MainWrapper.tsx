import { useAppSelector, useAppDispatch } from "@/hooks/useTypesRedux";
import { useEffect } from "react";
import ProductModal from "@/popups/ProductModal/ProductModal";
import { useRouter } from "next/router";
import apiSlice, { useAuthGoogleTokenMutation, useGetUserDataQuery } from "@/store/slices/apiSlice";
import { main_updateAuthPopup, main_updateCensoreModel, main_updateLoading, main_updateSignupPopup, main_updateUserData } from "@/store/slices/mainSlice";
import { authorizeFunc } from "@/helpers/authorizeUtils";
import ApiService from "@/service/apiService";
import Footer from "../Footer/Footer";
import Script from "next/script";
const service = new ApiService()

const MainWrapper = ({
	children
}: {
	children?: React.ReactNode
}) => {
	const router = useRouter()
	const dispatch = useAppDispatch();
	const { token: { access }, currentProduct } = useAppSelector(s => s.main)
	const [getUserData, userDatares] = apiSlice.endpoints.getUserData.useLazyQuery()
	const [authGoogleTokenResponse, authGoogleTokenResponseToken] = useAuthGoogleTokenMutation()
	const { query } = useRouter()

	useEffect(() => {
		if (query?.code && query?.state) {
			const { code, state } = query
			authGoogleTokenResponse({ code, state })
		}
	}, 
		[query]
	)

	useEffect(() => {
		if(access) {
			getUserData(access).then(res => {
				const {data, isSuccess} = res
				if(isSuccess && data) {
					dispatch(main_updateUserData(data))
				}
			})
		}
	}, [access])


	useEffect(() => {
		dispatch(main_updateLoading(authGoogleTokenResponseToken.isLoading))
		if (authGoogleTokenResponseToken.isSuccess && authGoogleTokenResponseToken.data?.access && authGoogleTokenResponseToken.data?.refresh) {
			authorizeFunc(authGoogleTokenResponseToken.data)
		}
	}, 
		[authGoogleTokenResponseToken]
	)


	// useEffect(() => {
	// 	nsfw.load().then(res => {
	// 		dispatch(main_updateCensoreModel(res))
	// 	})
	// }, [])

	useEffect(() => {
		dispatch(main_updateAuthPopup(false))
		dispatch(main_updateSignupPopup(false))
	}, [router])

	return (
		<>
			<Script id='gtm-1' async src="https://www.googletagmanager.com/gtag/js?id=G-1KET5VSY85"/>

			<Script
				id="gtm-2"
				async
				>
				{
					`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

					gtag('config', 'G-1KET5VSY85');
					`
				}
			</Script>
			<ProductModal
				open={currentProduct}
			/>
			{children}
		</>
	)
}


export default MainWrapper;

