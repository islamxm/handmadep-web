import { useAppSelector } from "@/hooks/useTypesRedux"


const CheckAuth = ({}) => {
    const {token} = useAppSelector(s => s)


    if(token) {
        return
    }
    
}