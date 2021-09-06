
<template>
  <div class="courseDetail">
    <div class="full-width-div">
      <b-card
        overlay
        img-src="https://picsum.photos/900/250/?image=3"
        img-alt="Card Image"
        text-variant="white"
        :title="this.selectedCourse.name"
        :sub-title="this.selectedCourse.courseCode"
      >
        <b-card-text>Some quick example text to build on the card and make up the bulk of the card's content.</b-card-text>
      </b-card>
      <br />
	<div>
     <h3>Upload Multiple Files</h3>
     <form id="uploadFiles" name="uploadFiles" method="post" th:action=@{http://localhost:8080/file/uploadFiles} encType="multipart/form-data">
       <input type="file" name="files" multiple required />
       <button type="submit">Submit</button>
     </form>
   </div>
      <br />
      <h2>Assignments</h2>
      <div v-for="a in this.assignments" :key="a.id">
        <b-list-group>
          <b-list-group-item href="#">{{ a }}</b-list-group-item>
        </b-list-group>
      </div>
      <br />
      <h2>Course Board</h2>
      <div class="chatContainer">
        <b-card title="Card title" sub-title="Card subtitle">
          <b-card-text>
            Some quick example text to build on the
            <em>card title</em> and make up the bulk of the card's
            content.
          </b-card-text>
        </b-card>
      </div>
      <div>
    <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
    ></b-form-textarea>

    <pre class="mt-3 mb-0">{{ messageText }}</pre>
    <b-button variant="primary" class="btn btn-primary btn-lg top-right-button mr-1">Post</b-button>

  </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Home",
  data() {
    return {
      selectedCourse: {},
      assignments: ["ders1", "ders2", "ders3"],
      messageText: '',
    };
  },
  components: {},
  created() {
    console.log("--> ** CourseDetail ");
    this.selectedCourse = this.$route.params.data;
    //     this.assignments = this.selectedCourse.assignments;
    console.log(this.selectedCourse.name);
  },
  methods: {}
};
</script>

<style scoped>
.full-width-div {
  position: absolute;
  width: 100%;
  left: 0;
}
.chatContainer {
	text-align: left;
}
</style>