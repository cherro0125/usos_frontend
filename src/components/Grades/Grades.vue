<template>
  <v-container>
    <h2 class="pl-5">Grades</h2>
    <GradesTable></GradesTable>
  </v-container>
</template>

<script>
import GradesTable from "./GradesTable/GradesTable";

export default {
  data() {
    return {};
  },
  components: { GradesTable }
};
</script>

<style scoped>
</style>