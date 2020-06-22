<template>
  <v-row justify="center">
    <v-dialog v-model="showAddStudentToGroup" persistent max-width="800">
      <v-card class="pa-12">
        <v-card-title class="headline justify-center">Select students</v-card-title>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="studentsWithGroups"
          item-key="id"
          show-select
          class="elevation-1"
        >
          <template v-slot:top></template>
        </v-data-table>
        <v-card-actions class="justify-center">
          <v-btn text @click="$emit('update:showAddStudentToGroup', false)">Cancel</v-btn>
          <v-btn text @click="addStudentToGroup">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      selected: [],
      studentsWithGroups: [],
      headers: [
        {
          text: "Id",
          align: "start",
          value: "id"
        },
        { text: "Name", value: "firstName" },
        { text: "Last name", value: "lastName" }
      ]
    };
  },
  props: ["showAddStudentToGroup"],
  computed: {
    ...mapGetters(["students", "allDefinedGroups"])
  },
  async created() {
    await this.getStudents();
    await this.getAllDefinedGroups();
    this.getStudentsWithGroups();
  },
  methods: {
    ...mapActions(["getStudents", "getAllDefinedGroups"]),
    addStudentToGroup() {
      const data = {
        studentIds: this.selected.map(x=>x.id)
      };
      this.selected=[];
      console.log(data.studentIds)
      this.$emit("addStudentToGroup", data);
      this.$emit("update:showAddStudentToGroup", false);
    },
    getStudentsWithGroups() {
      for (let h = 0; h < this.students.length; ++h) {
        this.studentsWithGroups.push(this.students[h]);
        this.studentsWithGroups[h].groups = [];
        for (let i = 0; i < this.allDefinedGroups.length; ++i) {
          for (let j = 0; j < this.allDefinedGroups[i].students.length; ++j) {
            if (
              this.allDefinedGroups[i].students[j].id == this.students[h].id
            ) {
              this.studentsWithGroups[h].groups.push(this.allDefinedGroups[i]);
            }
          }
        }
      }
      
    //   this.studentsWithGroups.forEach(swg =>
    //     swg.groups.forEach(g => {
    //       console.log(g.name);
    //     })
    //   );
    }
  }
};
</script>