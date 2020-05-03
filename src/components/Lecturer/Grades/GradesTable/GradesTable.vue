<template>
  <v-container>
    <v-card class="pa-6">
      <v-switch v-model="edit" :label="'grades editing ' + (edit ? 'enabled' : 'disabled')"></v-switch>
      <v-data-table
        hide-default-footer
        :dark="$vuetify.theme.dark"
        :headers="headers"
        :items="studentsGradesData"
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
export default {
  data() {
    return {
      headers: [
        { text: "Index", value: "index" },
        { text: "Name", value: "name" },
        { text: "Surname", value: "surname" },
        { text: "I Term", value: "firstTerm" },
        { text: "II Term", value: "secondTerm" }
      ],
      studentsGradesData: [
        {
          index: 1,
          name: "Jan",
          surname: "Kowalski",
          firstTerm: 2,
          secondTerm: ""
        }
      ],
      edit: false,
      grades: [2,3,4,5]
    };
  },
  methods: {
      saveGrades() {
          console.log(this.studentsGradesData[0])
      }
  }
};
</script>

<style scoped>
</style>