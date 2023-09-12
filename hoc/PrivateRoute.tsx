import { FC,PropsWithChildren, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useAppSelector } from "@/hooks/useTypesRedux";
import { useAppDispatch } from "@/hooks/useTypesRedux";
import { main_updateToken, main_deleteToken, main_updateLoading } from "@/store/slices/mainSlice";
import { useRefreshMutation } from "@/store/slices/apiSlice";
import { deauthorizeFunc } from "@/helpers/authorizeUtils";
import Router from "next/router";
import notify from "@/helpers/notify";

const PrivateRoute:FC<PropsWithChildren> = ({
  children
}) => {
  const {token: {access}} = useAppSelector(s => s.main)
  const [auth, setAuth] = useState<any>(undefined)

  useEffect(() => {
    if(access) {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }, [access])

  useEffect(() => {
    if(auth === false) {
      notify("You're not authorized")
      Router.replace('/')
    }
  }, [auth])

  if(auth === true) {
    return <>{children}</>
  }

  return null
}

export default PrivateRoute;