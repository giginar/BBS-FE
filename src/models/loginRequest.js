export default class LoginRequest {
    constructor(email, password, isTeacher) {
      this.email = email;
      this.password = password;
      this.isTeacher = isTeacher;
    }
  }