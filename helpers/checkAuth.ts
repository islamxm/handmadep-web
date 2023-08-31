import {deauthorizeFunc} from "@/helpers/authorizeUtils";
type statusType = number | 'FETCH_ERROR' | 'PARSING_ERROR' | 'TIMEOUT_ERROR' | 'CUSTOM_ERROR'
const checkAuth = (status: statusType) => {
  if(status === 401) {
    window.location.replace('/')
    deauthorizeFunc()
  }
}
export default checkAuth;