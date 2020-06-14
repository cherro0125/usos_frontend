<template>
  <v-container>
    <v-card class="pa-6">
      <v-row>
        <v-card-title>{{this.courseFullName}}</v-card-title>
        <v-spacer></v-spacer>
        <v-switch v-model="edit" :label="'grades editing ' + (edit ? 'enabled' : 'disabled')"></v-switch>
      </v-row>
      <v-data-table
        hide-default-footer
        :dark="$vuetify.theme.dark"
        :headers="headers"
        :items="students"
        class="elevation-1"
      >
        <template v-slot:item.firstTerm="{item}">
          <v-row>
            <p class="mt-4" v-if="!edit">{{item.firstTerm}}</p>
            <v-select v-model="item.firstTerm" :items="grades" v-else></v-select>
            <v-icon
              v-if="item.firstTerm && !edit"
              class="ml-4"
              small
              @click="deleteGrade(item)"
            >mdi-delete</v-icon>
          </v-row>
        </template>
        <template v-slot:item.secondTerm="{item}">
          <v-row>
            <p class="mt-4" v-if="!edit">{{item.secondTerm}}</p>
            <v-select v-model="item.secondTerm" :items="grades" v-else></v-select>
            <v-icon
              v-if="item.secondTerm && !edit"
              class="ml-4"
              small
              @click="deleteGrade(item)"
            >mdi-delete</v-icon>
          </v-row>
        </template>
      </v-data-table>
      <v-card-actions class="justify-center">
        <v-btn to="/lecturer/grades">cancel</v-btn>
        <v-btn @click="saveGrades">save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      headers: [
        { text: "Index", value: "id" },
        { text: "Name", value: "firstName" },
        { text: "Surname", value: "lastName" },
        { text: "I Term", value: "firstTerm", width: "300" },
        { text: "II Term", value: "secondTerm", width: "300" }
      ],
      students: [],
      studentsConst: [],
      edit: false,
      grades: [],
      courseFullName: "",
      courseId: ""
    };
  },
  computed: mapGetters(["courseData", "gradesValues", "courseStudentsData"]),
  methods: {
    ...mapActions([
      "getCourseData",
      "addGrade",
      "getGradesValues",
      "getCourseStudentsData"
    ]),
    async saveGrades() {
      const firstTermStudents = [],
        secondTermStudents = [];
      this.studentsConst.forEach(studentConst => {
        this.students.forEach(student => {
          if (studentConst.firstTerm !== student.firstTerm)
            firstTermStudents.push(student);
          if (studentConst.secondTerm !== student.secondTerm)
            secondTermStudents.push(student);
        });
      });

      const params = {
        description: "",
        courseGroupId: this.courseId,
        createdById: localStorage.getItem("userId")
      };

      if (!firstTermStudents.length && !secondTermStudents.length)
        this.$notify({
          group: "foo",
          title: "grades not changed"
        });
      else {
        if (firstTermStudents.length)
          await Promise.all(
            firstTermStudents.map(student => {
              params.examDateType = "FIRST";
              params.assignedUserId = student.id;
              params.value = student.firstTerm;
              return this.addGrade(params);
            })
          );

        if (secondTermStudents.length)
          await Promise.all(
            secondTermStudents.map(student => {
              params.examDateType = "SECOND";
              params.assignedUserId = student.id;
              params.value = student.secondTerm;
              return this.addGrade(params);
            })
          );

        await this.getCourseData();
        this.retrieveCourseData();

        this.$notify({
          group: "foo",
          type: "success",
          title: "grades sucessfully saved"
        });
      }
    },
    retrieveCourseData() {
      this.courseFullName = this.$route.params.course;
      const course = this.courseData.find(
        course => course.name === this.courseFullName
      );
      this.students = this.courseStudentsData;
      this.studentsConst = JSON.parse(JSON.stringify(this.students));
      this.courseId = course.id;
      this.edit = false;
    },
    deleteGrade(item) {
      console.log(item);
    }
  },
  async created() {
    await Promise.all([
      this.getGradesValues(),
      this.getCourseData(),
      this.getCourseStudentsData({
        id: localStorage.getItem("userId"),
        course: this.$route.params.course
      })
    ]);
    this.retrieveCourseData();
    this.grades = this.gradesValues;
  }
};
</script>

<style scoped>
</style>