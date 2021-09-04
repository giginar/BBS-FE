import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'user/login', {
                email: user.email,
                password: user.password,
                isTeacher: false
            })
            .then(response => {
                if (response.data.accessToken) {
                    //this.getUserInfo(user.email, user.isTeacher);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    console.log(response.data)
                    return response.data;
                }
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

}

export default new AuthService();