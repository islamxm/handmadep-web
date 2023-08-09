import { useAppSelector, useAppDispatch } from "@/hooks/useTypesRedux";
import { useEffect } from "react";
import ApiService from "@/service/apiService";
import { updateUserData, closeSearch } from "@/store/actions";
import { Cookies } from "typescript-cookie";
import ProductModal from "@/popups/ProductModal/ProductModal";
import { useRouter } from "next/router";

const service = new ApiService()
const MainWrapper = ({
    children
}: {
    children?: React.ReactNode
}) => {
    const dispatch = useAppDispatch();
    const {token: {access}, currentProduct} = useAppSelector(s => s)


    useEffect(() => {
        if(access) {
            service.getSelf(access).then(res => {
                console.log(res)
                if(res?.id) {
                    dispatch(updateUserData(res))
                } else {
                    dispatch(updateUserData(null))
                    Cookies.remove('handmadep-web-access-token')
                    Cookies.remove('handmadep-web-refresh-token')
                    if(process?.browser) {
                        sessionStorage.removeItem('handmadep-web-access-token')
                        sessionStorage.removeItem('handmadep-web-refresh-token')
                    }
                }
            })
        }
    }, [access])

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

