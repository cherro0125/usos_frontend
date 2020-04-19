<template>
  <v-container>
    <v-row class="pl-10 pr-10">
      <h2>List of scholarship payments</h2>
      <v-spacer></v-spacer>
      <v-btn>Apply for a scholarship</v-btn>
      </v-row>
    <ScholarshipTable></ScholarshipTable>
  </v-container>
</template>

<script>
import ScholarshipTable from "./ScholarshipsTable/ScholarshipsTable";

export default {
  data() {
    return {};
  },
  components: {
    ScholarshipTable
  }
};
</script>

<style scoped>
</style>