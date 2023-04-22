import { useAppSelector, useAppDispatch } from "@/hooks/useTypesRedux";
import { useEffect } from "react";
import ApiService from "@/service/apiService";
import { updateUserData } from "@/store/actions";

const service = new ApiService()
const MainWrapper = ({
    children
}: {
    children?: React.ReactNode
}) => {
    const dispatch = useAppDispatch();
    const {token: {access}} = useAppSelector(s => s)

    useEffect(() => {
        if(access) {
            service.getSelf(access).then(res => {
                console.log(res)
                if(res?.id) {
                    dispatch(updateUserData(res))
                }
            })
        }
    }, [access])

    return (
        <>
            {children}
        </>
    )
}


export default MainWrapper;

