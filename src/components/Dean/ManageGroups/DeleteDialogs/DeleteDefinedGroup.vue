<template>
    <v-row justify="center">
      <v-dialog v-model="showDeleteDefinedGroup" persistent max-width="800">
        <v-card class="pa-12">
          <v-card-title class="headline justify-center">Are you sure want to delete this defined group?</v-card-title>
          <v-card-actions class="justify-center">
          <v-btn text @click="$emit('update:showDeleteDefinedGroup', false)">Cancel</v-btn>
          <v-btn text @click="deleteDefinedGroup">Delete</v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script>
export default {
    props: ["showDeleteDefinedGroup"],
  methods: {
    deleteDefinedGroup() {
        this.$emit("deleteDefinedGroup");
        this.$emit("update:showDeleteDefinedGroup", false);
      }
    }
}
</script>