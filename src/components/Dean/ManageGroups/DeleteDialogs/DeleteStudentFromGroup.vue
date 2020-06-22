<template>
    <v-row justify="center">
      <v-dialog v-model="showRemoveStudentFromGroup" persistent max-width="800">
        <v-card class="pa-12">
          <v-card-title class="headline justify-center">Are you sure want to remove student from this group?</v-card-title>
          <v-card-actions class="justify-center">
          <v-btn text @click="$emit('update:showRemoveStudentFromGroup', false)">Cancel</v-btn>
          <v-btn text @click="removeStudentFromGroup">Delete</v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script>
export default {
    props: ["showRemoveStudentFromGroup"],
  methods: {
    removeStudentFromGroup() {
        this.$emit("removeStudentFromGroup");
        this.$emit("update:showRemoveStudentFromGroup", false);
      }
    }
}
</script>