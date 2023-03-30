import { endpoints } from "./endpoints";
import axios from "axios";
import checkAuth from "./checkAuth";

class ApiService {
    register = async (body: {
        
    }) => {
        try {
            let res = await axios.post(endpoints.auth_jwt_create_create, body);
            return await checkAuth(res)
        } catch(err) {
            console.log(err)
        }
    }
}


export default ApiService;