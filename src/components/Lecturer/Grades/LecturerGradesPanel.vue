<template>
  <v-container>
    <v-form @submit.prevent="showGradesTable()">
      <v-card class="pa-10">
        <v-select v-model="courses" label="select course"></v-select>
        <v-select label="select group"></v-select>
        <v-card-actions class="justify-center">
          <v-btn type="submit">Show grades table</v-btn>
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
      courseGroups: []
    };
  },
  computed: mapGetters(["courseData"]),
  methods: {
    ...mapActions(["getCourseData"]),
    showGradesTable() {
      this.$router.push("/lecturer/grades/course");
    }
  },
  async created() {
    await this.getCourseData();
    // this.courseTypes = this.courseData.map(course => course.courseType);
    this.courses = this.courseData.map(course => course.course.name);
  }
};
</script>

<style scoped>
</style>