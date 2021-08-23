import axios from 'axios';

const API_URL = 'http://localhost:8080/';


class AuthService {
  login(loginRequest) {
    return axios
      .post(API_URL + 'user/login', {
        email: loginRequest.email,
        password: loginRequest.password
      })
      .then(response => {
        if (response.data.accessToken) {
          this.getUserInfo(loginRequest.email, loginRequest.isTeacher);
        }
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  getUserInfo(userEmail, isTeacher) {
    return axios
      .get(API_URL + 'user/detail', {
        email: userEmail,
        isTeacher: isTeacher
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
          console.log(response.data)
          return response.data;
        }
      })
    }
}
  
export default new AuthService();
