<template>
  <v-container>
    <v-card>
      <v-data-table
        hide-default-footer
        :dark="$vuetify.theme.dark"
        :headers="headers"
        class="elevation-1"
      ></v-data-table>
      <v-card-actions class="justify-center">
         <v-btn to="/lecturer/grades">cancel</v-btn>
        <v-btn>save</v-btn>
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
      ]
    };
  }
};
</script>

<style scoped>
</style>