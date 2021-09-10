<template>
  <div class="vue-template" id="app">
    <div class="profile">
      <div class="mt-3">
        <h1>My Courses</h1>
        <div class="mt-5" v-for="c in this.courseList" :key="c.id">
          <b-card no-body class="overflow-hidden" style="max-width: 540px;">
            <a href="#" :class="getCourseDetails" @click="getCourseDetails(c)">
              <b-row no-gutters>
                <b-col md="6">
                  <b-card-img :src="c.image" alt="Image" class="rounded-0"></b-card-img>
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
      <div class="user-profile">
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>
          <b-card
            no-body
            style="max-width: 20rem;"
            img-src="data:image/png;base64,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"
            img-alt="Image"
            img-top
          >
            <template #header></template>
            <b-card-body>
              <b-card-title>{{this.myname}}</b-card-title>
              <b-card-sub-title class="mb-2">{{ this.activeUser.birthday }}</b-card-sub-title>
              <b-card-text></b-card-text>
            </b-card-body>

            <b-list-group flush>
              <b-list-group-item>{{ this.activeUser.email }}</b-list-group-item>
              <b-list-group-item>{{ this.activeUser.city }}</b-list-group-item>
            </b-list-group>
          </b-card>
          <br />
          <br />
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
      currentUser: {},
      activeUser: {},
      myname: "",
      courseList: [],
      is_loading: false,
      modalShow: false,
      date: new Date(),
      bgimage:
        "url(https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixers.hk%2Fwallpapers%2Fvector-seamless-banana-pattern-modern-tropical-print-127184142&psig=AOvVaw0paIckHgDmrk2CIqIQXydw&ust=1631305870847000&source=images&cd=vfe&ved=2ahUKEwiunPGI3vLyAhVQ7rsIHV0qCOYQjRx6BAgAEAk)"
    };
  },

  components: {},
  created() {
    this.currentUser = this.$route.params.data;
    console.log(this.currentUser);
    this.fetchAllDetails();
  },

  methods: {
    async fetchAllDetails() {
      console.log("--> fetchAllDetails");
      console.log(this.currentUser.email);
      UserService.userDetail(this.currentUser.email).then(response => {
        console.log("--> fetchAllDetails");
        this.activeUser = response.data;
        this.courseList = response.data.registeredCourses;
        this.myname = this.activeUser.name + " " + this.activeUser.surname;
      });
    },

    getCourseDetails(selectedCourse) {
      console.log("--> getCourseDetails");
      console.log(selectedCourse.name);
      this.$router.push({
        name: "CourseDetail",
        params: { data: selectedCourse, myUser: this.activeUser }
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

.mt-3 {
  float: left;
  width: 50%;
}

.html {
  background-color: black;
}

h1 {
  text-align: center;
  color: aliceblue;
}

.user-profile {
  float: left;
  width: 50%;
  padding-left: 5%;
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

