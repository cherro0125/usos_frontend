<template>
  <v-container>
    <h2 class="ml-2 mb-5">Group manager</h2>
    <v-expansion-panels accordion>
      <v-toolbar flat class="pa-2" >
        
      </v-toolbar>
      <v-expansion-panel disabled="true">
          <v-expansion-panel-header>
            <v-col cols="3">
              name
            </v-col>
            <v-col cols="2">
              fulltime
            </v-col>
            <v-col cols="2">
              number of semesters
            </v-col>
            <v-col cols="2">
              type
            </v-col>
          </v-expansion-panel-header>
        </v-expansion-panel>
        <v-expansion-panel
          v-for="(item,i) in degreeCourses"
          :key="i"
        >
          <v-expansion-panel-header>
            <v-col cols="3">
              {{item.name}}
            </v-col>
            <v-col cols="2">
              {{item.isFullTimeStudies}}
            </v-col>
            <v-col cols="2">
              {{item.numberOfSemesters}}
            </v-col>
            <v-col cols="2">
              {{item.finalDegreeType}}
            </v-col>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            {{item.description}}

          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
/* eslint-disable */
export default {
  data() {
    return {
      dialog: false,
      deleteDialog: false,
    };
  },

  computed: {
    ...mapGetters(["degreeCourses"])
  },
  async created() {
    await this.getDegreeCourses();
  },
  methods: {
    ...mapActions(["getDegreeCourses"])
  }
};
</script>