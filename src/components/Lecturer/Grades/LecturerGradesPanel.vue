<template>
  <v-container>
    <v-form @submit.prevent="showGradesTable()">
      <v-card class="pa-10">
        <v-select v-model="course" :items="courses" label="select course"></v-select>
        <v-select v-if="course" v-model="courseType" :items="courseTypes" label="select course type"></v-select>
        <v-select v-if="courseType" v-model="courseGroup" :items="courseGroups" label="select course group"></v-select>
        <v-card-actions class="justify-center">
          <v-btn type="submit" :disabled="!course || !courseType || !courseGroup">Show grades table</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      courses: [],
      courseTypes: [],
      courseGroups: [],
      course: "",
      courseType: "",
      courseGroup: ""
    };
  },
  computed: mapGetters(["courseData"]),
  methods: {
    ...mapActions(["getCourseData"]),
    showGradesTable() {
      this.$router.push(`/lecturer/grades/${this.courseGroup}`);
    }
  },
  async created() {
    await this.getCourseData();
    this.courses = this.courseData.map(course => course.course.name);
  },
  watch: {
    course() {
        console.log(this.course)
      if (this.course)
        this.courseTypes = this.courseData
          .filter(course => course.course.name === this.course)
          .map(course => course.courseType);
    },
    courseType() {
      if (this.courseType)
        this.courseGroups = this.courseData
          .filter(course => course.course.name === this.course && course.courseType === this.courseType)
          .map(course => course.name);
    }
  }
};
</script>

<style scoped>
</style>