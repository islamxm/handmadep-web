import {deauthorizeFunc} from "@/helpers/authorizeUtils";
type statusType = number | 'FETCH_ERROR' | 'PARSING_ERROR' | 'TIMEOUT_ERROR' | 'CUSTOM_ERROR'
import Router from 'next/router';
const checkAuth = (status: statusType) => {
  alert(status)
  if(status === 401) {
    Router.replace('/')
    deauthorizeFunc()
  }
}
export default checkAuth;