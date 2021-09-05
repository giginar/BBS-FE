import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class UserService {
    userDetail() {
            const params = {
                email: "ue@gmail.com",
                isTeacher: false,
            }
            return axios.post(API_URL + 'user/detail', params, {
                headers: authHeader()
            })
        }
        // downloadFile() {
        //     return axios.get(API_URL + 'user/download' {
        //         headers: authHeader()
        //     })
        // },
}


export default new UserService();