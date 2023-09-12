import { useRefreshMutation } from "@/store/slices/apiSlice";
import { useEffect, useState } from "react"
import { useAppSelector } from "./useTypesRedux";
import { useAppDispatch } from "./useTypesRedux";
import { deauthorizeFunc } from "@/helpers/authorizeUtils";
import { main_deleteToken } from "@/store/slices/mainSlice";

const useAuth = (refreshToken: any) => {
  const dispatch = useAppDispatch()
  const [getToken, {isLoading, isError, isSuccess, data}] = useRefreshMutation()

  useEffect(() => {
    if(refreshToken) {
      getToken({refresh: refreshToken})
    }
  }, [refreshToken])

  useEffect(() => {
    if(isError) {
      dispatch(main_deleteToken())
      deauthorizeFunc()
    }
  }, [isError])

  return {
    isLoading,
    isError,
    isSuccess,
    data
  }
}

export default useAuth;