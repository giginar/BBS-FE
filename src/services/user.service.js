import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class UserService {
    userDetail(userEmail) {
        const params = {
            email: userEmail,
            isTeacher: 0,
        }
        return axios.post(API_URL + 'user/detail', params, {
            headers: authHeader()
        })
    }

    getMessageList(courseId) {
        return axios.get(API_URL + 'chat/get/' + courseId, {
            headers: authHeader()
        })
    }

    sendMessage(messageText, messageCourseId, senderId) {
        const params = {
            message: messageText,
            courseId: messageCourseId,
            studentId: senderId,
        }
        console.log(params);
        return axios.post(API_URL + 'chat/post', params, {
            headers: authHeader()
        })
    }

    getAllDocuments() {
        return axios.get(API_URL + 'file/downloadFiles')

    }
    downloadFile(fileId) {
        return axios.get(API_URL + 'file/downloadFile/' + fileId, {
            responseType: 'blob',
        })
    }
}


export default new UserService();