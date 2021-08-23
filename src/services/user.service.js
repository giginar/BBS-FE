import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/pizzas/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'getAllPizzas', { headers: authHeader() });
  }
}

export default new UserService();
