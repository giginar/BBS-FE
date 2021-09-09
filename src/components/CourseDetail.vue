
<template>
  <div class="courseDetail">
      <div class="box-image">
        <b-card 
          overlay="fill"
          :img-src="this.selectedCourse.image"
          img-alt="Card Image"
          text-variant="white"
          img-height="200"
          :title="this.selectedCourse.courseCode"
          :sub-title="this.selectedCourse.name"
        >
          <b-card-text>{{ this.selectedCourse.description }}</b-card-text>
        </b-card>
      </div>
    <div class="full-width-div">
      <br />
      <div>
        <h3>Upload Multiple Files</h3>
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <input type="file" @change="onFileUpload" />
          </div>
          <div class="form-group">
            <button class="btn btn-warning btn-block btn-lg">Upload File</button>
          </div>
        </form>
      </div>
      <br />
      <h2>Assignments</h2>
      <div v-for="a in this.assignments" :key="a.id">
        <b-list-group>
          <b-list-group-item @click="downloadFile(a.id, a.name)" href="#">{{ a.name }}</b-list-group-item>
        </b-list-group>
      </div>
      <br />
      <br />
      <br />
    </div>
    <div class="chat-board">
      <h2>Course Board</h2>
      <div class="chatContainer" v-for="chat in this.messageList" :key="chat.id">
        <b-card :title="chat.senderName" :sub-title="chat.date">
          <b-card-text>{{ chat.message }}</b-card-text>
        </b-card>
      </div>
      <div>
        <b-form-textarea
          id="textarea"
          v-model="message"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>

        <pre class="mt-3 mb-0">{{ messageText }}</pre>
        <b-button
          variant="primary"
          @click="sendMessage"
          class="btn btn-warning btn-block btn-lg"
        >Post</b-button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import UserService from "../services/user.service";

export default {

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  name: "Home",
  data() {
    return {
      currentUser: {},
      selectedCourse: {},
      assignments: [],
      messageText: "",
      FILE: null,
      messageList: [],
      message: ""
    };
  },
  components: {},
  created() {
    console.log("--> ** CourseDetail ");
    this.selectedCourse = this.$route.params.data;
    this.currentUser = this.$route.params.myUser;
    console.log(this.currentUser);
    this.assignments = this.selectedCourse.assignments;
    console.log(this.selectedCourse);
    console.log(this.selectedCourse.name);
    this.getAllMessageList();
    this.getAllDocuments();
  },
  methods: {
    onFileUpload(event) {
      this.FILE = event.target.files[0];
    },
    onSubmit() {
      const formData = new FormData();
      formData.append("files", this.FILE);
      axios
        .post("http://localhost:8080/file/uploadFiles", formData, {})
        .then(res => {
          console.log(res);
          this.getAllDocuments();
        });
    },
    async getAllMessageList() {
      UserService.getMessageList(this.selectedCourse.id).then(response => {
        console.log("--> messageList");
        this.messageList = response.data;
        console.log(this.messageList);
      });
    },
    async sendMessage() {
      console.log(
        "--> message " + this.message,
        this.selectedCourse.id,
        this.currentUser.id
      );
      if (this.message.length > 3) {
        UserService.sendMessage(
          this.message,
          this.selectedCourse.id,
          this.currentUser.id
        ).then(response => {
          console.log("--> new messageList");
          console.log(response.data);
          this.messageList = response.data;
          this.message = "";
          console.log(this.messageList);
        });
      }
    },
    async getAllDocuments() {
      UserService.getAllDocuments().then(response => {
        this.assignments = response.data;
      });
    },

    downloadFile(fileId, fileName) {
      console.log("dowload me!!!");
      UserService.downloadFile(fileId).then(response => {
        console.log(response.data);

        var fileExtension = fileName.split(".").pop();
        console.log(fileExtension); // three
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "file." + fileExtension);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    }
  }
};
</script>

<style scoped>
.body {
  display: flex;
}
.full-width-div {
  float: left;
  width:50%;
  left: 0;
  color: white;
}
.chatContainer {
  text-align: left;
  color: black;
}
.b-card-image {
  object-fit: fill;
}
.h2 {
  color: white;
}
.chat-board {
  float: right;
  width: 45%;
  margin-top: 20px;
  color: white;
}
</style>