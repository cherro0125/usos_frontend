<template>
  <v-container>
    <h2 class="ml-4 mb-8">Payments</h2>
    <v-data-table
      hide-default-footer
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
        { text: "type", value: "id" },
        { text: "payable to", value: "firstName" },
        { text: "details", value: "lastName" },
        { text: "status", value: "firstTerm", width: "300" }
      ]
    }
  }
};
</script>

<style scoped>
</style>