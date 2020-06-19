<template>
  <v-row justify="center">
    <v-dialog v-model="showAddDegreeCourse" persistent max-width="800">
      <v-card class="pa-12">
        <v-card-title class="headline justify-center">Add new course</v-card-title>
        <v-text-field v-model="name" label="Name"></v-text-field>
        <div v-if="emptyName" class="red--text" style="font-size:0.8em">Can not be empty</div>
        <v-textarea
          v-model="description"
          name="input-7-1"
          auto-grow
          row-height="5vh"
          label="Description"
        ></v-textarea>
        <v-checkbox v-model="isFullTimeStudies" label="Full time"></v-checkbox>
        <v-text-field
          v-model="numberOfSemesters"
          hide-details
          single-line
          type="number"
          label="Number of semesters"
        ></v-text-field>
        <div v-if="emptyNumberOfSemesters" class="red--text" style="font-size:0.8em">Can not be empty</div>
        <v-select v-model="degreeType" :items="degreeTypes" placeholder="Degree type"></v-select>
        <div v-if="emptyDegreeType" class="red--text" style="font-size:0.8em">Can not be empty</div>
        <v-card-actions class="justify-center">
          <v-btn text @click="$emit('update:showAddDegreeCourse', false)">Cancel</v-btn>
          <v-btn text @click="addDegreeCourse">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      description: "",
      isFullTimeStudies: false,
      numberOfSemesters: "",
      degreeType: "",
      emptyName: false,
      emptyNumberOfSemesters: false,
      emptyDegreeType: false
    };
  },
  props: ["showAddDegreeCourse"],
  computed: {
    ...mapGetters(["degreeTypes"])
  },
  async created() {
    await this.getDegreeTypes();
  },
  methods: {
    ...mapActions(["getDegreeTypes"]),
    addDegreeCourse() {
      if (this.name == "") {
        this.emptyName = true;
      } else {
        this.emptyName = false;
      }
      if (this.numberOfSemesters == "") {
        this.emptyNumberOfSemesters = true;
      } else {
        this.emptyNumberOfSemesters = false;
      }
      if (this.degreeType == "") {
        this.emptyDegreeType = true;
      } else {
        this.emptyDegreeType = false;
      }
      if (!this.emptyName && !this.emptyNumberOfSemesters && !this.emptyDegreeType) {
        const data = {
          name: this.name,
          description: this.description,
          isFullTimeStudies: this.isFullTimeStudies,
          numberOfSemesters: this.numberOfSemesters,
          finalDegreeType: this.degreeType
        };
        this.name = "";
        this.description = "";
        this.isFullTimeStudies = false;
        this.numberOfSemesters = 7;
        this.degreeType = "";
        this.$emit("addDegreeCourse", data);
        this.$emit("update:showAddDegreeCourse", false);
      }
    }
  }
};
</script>