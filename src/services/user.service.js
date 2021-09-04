import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class UserService {
    getUserDetail() {
        return axios.post(API_URL + 'user/detail', {
            headers: authHeader(),
            params: {
                email: "ue@gmail.com",
                isTeacher: false,
            }
        })
    }
}

export default new UserService();