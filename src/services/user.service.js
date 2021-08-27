import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class UserService {
  getUserDetail(email, isTeacher) {
    return axios.get(API_URL + 'user/detail', { headers: authHeader() , 
      email: email,
      isTeacher: isTeacher },
      console.log(email),
      console.log(isTeacher));
    }
}

export default new UserService();
