import { useAppSelector, useAppDispatch } from "@/hooks/useTypesRedux";
import { useEffect } from "react";
import ApiService from "@/service/apiService";
// import { updateUserData, closeSearch } from "@/store/actions";
import { Cookies } from "typescript-cookie";
import ProductModal from "@/popups/ProductModal/ProductModal";
import { useRouter } from "next/router";
import { useAuthGoogleTokenMutation, useGetUserDataQuery } from "@/store/slices/apiSlice";
import { main_updateLoading } from "@/store/slices/mainSlice";
import {authorizeFunc} from "@/helpers/authorizeUtils";

const MainWrapper = ({
    children
}: {
    children?: React.ReactNode
}) => {
    const dispatch = useAppDispatch();
    const {token: {access}, currentProduct} = useAppSelector(s => s.main)
    const {data, isLoading, isFetching} = useGetUserDataQuery(access)
    const [authGoogleTokenResponse, authGoogleTokenResponseToken] = useAuthGoogleTokenMutation()
    const {query} = useRouter()


    useEffect(() => {
        if(query?.code && query?.state) {
            const {code, state} = query
            authGoogleTokenResponse({code, state})
        }
    }, [query])

    useEffect(() => {
        dispatch(main_updateLoading(authGoogleTokenResponseToken.isLoading))
        if(authGoogleTokenResponseToken.isSuccess && authGoogleTokenResponseToken.data?.access && authGoogleTokenResponseToken.data?.refresh) {
            authorizeFunc(authGoogleTokenResponseToken.data)
        }
    }, [authGoogleTokenResponseToken])


    return (
        <>
            <ProductModal
                open={currentProduct}
                />
            {children}
        </>
    )
}


export default MainWrapper;

