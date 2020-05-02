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
        {
          text: "Subject",
          align: "start",
          value: "name"
        },
        { text: "Mark", value: "mark" },
        { text: "Ects", value: "ects" },
      ]
    };
  }
};
</script>

<style scoped>
</style>