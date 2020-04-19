<template>
  <v-container>
    <h2 class="pl-5">Scholarships</h2>
    <v-tabs class="mt-5" v-model="tab">
      <v-tab>My scholarships</v-tab>
      <v-tab>Scholarships payments</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item></v-tab-item>
      <v-tab-item>
        <ScholarshipTable></ScholarshipTable>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import ScholarshipTable from "./ScholarshipsTable/ScholarshipsTable";

export default {
  data() {
    return {
      tab: ""
    };
  },
  components: {
    ScholarshipTable
  }
};
</script>

<style scoped>
</style>