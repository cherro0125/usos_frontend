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
          <p v-if="!edit">{{item.firstTerm}}</p>
          <v-select v-model="item.firstTerm" :items="grades" v-else></v-select>
        </template>
        <template v-slot:item.secondTerm="{item}">
          <p v-if="!edit">{{item.secondTerm}}</p>
          <v-select v-model="item.secondTerm" :items="grades" v-else></v-select>
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
        { text: "I Term", value: "firstTerm", width: "250" },
        { text: "II Term", value: "secondTerm", width: "250" }
      ],
      students: [],
      studentsConst: [],
      edit: false,
      grades: [],
      courseFullName: "",
      courseId: ""
    };
  },
  computed: mapGetters(["courseData", "gradesValues"]),
  methods: {
    ...mapActions(["getCourseData", "addGrade", "getGradesValues"]),
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
        //UNCOMMENT THIS WHEN GRADES WILL BE RETRIEVED FROM BACKEND
        // await this.getCourseData();
        // this.retrieveData();
        //

        //DELETE THIS WHEN GRADES WILL BE RETRIEVED FROM BACKEND
        this.edit =false
        //
        
        this.$notify({
          group: "foo",
          type: "success",
          title: "grades sucessfully saved"
        });
      }
    },
    retrieveData() {
      this.courseFullName = this.$route.params.course;
      const course = this.courseData.find(
        course => course.name === this.courseFullName
      );
      this.students = course.students;
      //DELETE THIS WHEN GRADES WILL BE RETRIEVED FROM BACKEND
      this.students.forEach(student => {
        student.firstTerm = "";
        student.secondTerm = "";
      });
      //
      this.studentsConst = JSON.parse(JSON.stringify(this.students));
      this.courseId = course.id;
      this.edit=false;
    }
  },
  async created() {
    await this.getCourseData();
    this.retrieveData();
    await this.getGradesValues();
    this.grades = this.gradesValues;
  }
};
</script>

<style scoped>
</style>