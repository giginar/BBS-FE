<template>
  <div class="vue-template">
    <div class="profile">
      <div class="mt-3">
        <h1>My Courses</h1>
        <div class="mt-5" v-for="c in this.courseList" :key="c.id">
          <b-card no-body class="overflow-hidden" style="max-width: 540px;">
            <a href="#" :class="getCourseDetails" @click="getCourseDetails(c)">
              <b-row no-gutters>
                <b-col md="6">
                  <b-card-img
                    src="https://1000logos.net/wp-content/uploads/2020/09/Java-Logo.png"
                    alt="Image"
                    class="rounded-0"
                  ></b-card-img>
                </b-col>
                <b-col md="6">
                  <b-card-body :title="c.courseCode">
                    <b-card-text>{{ c.name }}</b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
            </a>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Profile",
  data() {
    return {
      activeUser: {},
      myname: "",
      courseList: [],
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
    this.fetchAllDetails();
  },
  methods: {
    async fetchAllDetails() {
      UserService.userDetail().then(response => {
        console.log("--> fetchAllDetails");
        this.activeUser = response.data;
        this.courseList = response.data.registeredCourses;
      });
    },

    getCourseDetails(selectedCourse) {
      console.log("--> getCourseDetails");
      console.log(selectedCourse.name)
      this.$router.push({
        name: "CourseDetail",
        params: { data: selectedCourse, myUser: this.activeUser}
      });
    },

    showMessage() {
      this.modalShow = !this.modalShow;
    }
  }
};
</script>

<style scoped>
.body {
  background: #04091d !important;
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

a,
a:focus,
a:active {
  text-decoration: none;
  color: inherit;
}

a:hover {
  color: inherit;
}
</style>

