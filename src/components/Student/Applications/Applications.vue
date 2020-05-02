<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <h2 class="pl-5">Applications</h2>
        <v-select v-model="application" class="mt-5" :items="applicationsTypes" outlined></v-select>
        <v-btn width="100%" large :to="`/applications/${applicationsTypes.findIndex(val => val === application)}/apply`">Apply</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      application: "",
      applicationsTypes: [
        "rectors scholarship",
        "social scholarship",
        "application for a dormitory"
      ]
    };
  },
  watch: {
    applicationId() {
      console.log(this.applicationId)
    }
  }
};
</script>

<style scoped>
</style>