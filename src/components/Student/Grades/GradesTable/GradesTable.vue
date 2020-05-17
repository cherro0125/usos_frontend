<template>
  <v-container>
    <v-data-table
      hide-default-footer
      :dark="$vuetify.theme.dark"
      :headers="headers"
      :items="grades"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      headers: [
        { text: "course", value: "name" },
        { text: "type", value: "type" },
        { text: "ects", value: "ects" },
        { text: "I term", value: "firstTerm" },
        { text: "II term", value: "secondTerm" },
      ]
    };
  },
  computed: mapGetters(['grades']),
  async created() {
    await this.getGrades(localStorage.getItem("userId"));
  },
  methods: {
    ...mapActions(["getGrades"])
  }
};
</script>

<style scoped>
</style>