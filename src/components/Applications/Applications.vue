<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <h2 class="pl-5">Applications</h2>
        <v-select class="mt-5" :items="applicationsTypes" outlined></v-select>
        <v-btn width="100%" large>Apply</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
        applicationsTypes: ["rectors scholarship", "social scholarship", "application for a dormitory"]
    };
  }
};
</script>

<style scoped>
</style>