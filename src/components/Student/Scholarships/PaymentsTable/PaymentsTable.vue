<template>
  <v-container>
    <v-data-table
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
          text: "Type",
          align: "start",
          value: "name"
        },
        { text: "Amount", value: "amount" },
        { text: "Status", value: "status" },
        { text: "Date", value: "date" },
      ]
    };
  }
};
</script>

<style scoped>
</style>