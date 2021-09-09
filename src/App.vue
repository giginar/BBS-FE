<template>
  <div id="app">
    <b-navbar class="navbar" variant="warning" type="light" >
        <a href class="navbar-brand" @click="openProfile()">Banana Student System</a>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.email }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>
    </b-navbar>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },

  created: function () {
    document.body.style.backgroundColor = "#424242";
  },
  
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    openProfile() {
      this.$router.push("/profile");
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#b-navbar {
  padding: 30px;
}

#b-navbar  a {
  font-weight: bold;
  color: #2c3e50;
}

#b-navbar  a.router-link-exact-active {
  color: #42b983;
}
</style>
