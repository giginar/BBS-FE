<template>
  <div class="vue-template">
    <div class="profile">
      <div>
        {{this.activeUser}}
        <b-modal v-model="modalShow"> this is the student!</b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';
//import axios from 'axios';

export default {
  name: "Profile",
  data() {
    return {
      activeUser: {},
      is_loading: false,
      modalShow: false
    };
  },
  // mounted() {
  //   if (!this.currentUser) {
  //     this.$router.push("/login");
  //   }
  // },
  
  components: {},
  created() {
    // this.is_loading = true;
    this.fetchAllDetails();
  },
  methods: {
    async fetchAllDetails() {
      UserService.getUserDetail().then(
        (response) => (
          this.activeUser = response.data
        ),
      );
    },
    showMessage() {
      this.modalShow = !this.modalShow;
    }
  },
};
</script>

<style scoped>

.body {
    background: #2554FF !important;
    min-height: 100vh;
    display: flex;
    font-weight: 400;
  }

.cards {
  border-color: black;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

</style>

