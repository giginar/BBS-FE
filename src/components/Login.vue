<template>
  <div class="vue-tempalte">
    <div class="card card-container">
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="user.email" type="text" class="form-control" name="email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="user.password" type="password" class="form-control" name="password" />
        </div>
        <div class="form-group">
          <button class="btn btn-warning btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import user from "../models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new user("", "", ""),
      loading: false,
      message: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$store.dispatch("auth/login", this.user).then(
        () => {
          console.log("handle login response");
          console.log(this.user);
          // this.$router.push("/profile");
          this.$router.push({
            name: "Profile",
            params: { data: this.user }
          });
        },
        error => {
          this.loading = false;
          this.message = "username or password is wrong";
          console.log(error.message);
        }
      );
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>