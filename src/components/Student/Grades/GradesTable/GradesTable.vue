<template>
  <v-container>
    <v-data-table
      hide-default-footer
      :dark="$vuetify.theme.dark"
      :headers="headers"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "subject", value: "name" },
        { text: "type", value: "type" },
        { text: "ects", value: "ects" },
        { text: "I term", value: "firstTerm" },
        { text: "II term", value: "secondTerm" },
      ]
    };
  }
};
</script>

<style scoped>
</style>