<template>
    <v-row justify="center">
      <v-dialog v-model="showDeleteDegreeCourse" persistent max-width="800">
        <v-card class="pa-12">
          <v-card-title class="headline justify-center">Are you sure want to delete this degree course?</v-card-title>
          <v-card-actions class="justify-center">
          <v-btn text @click="$emit('update:showDeleteDegreeCourse', false)">Cancel</v-btn>
          <v-btn text @click="deleteDegreeCourse">Delete</v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script>
export default {
    props: ["showDeleteDegreeCourse"],
  methods: {
    deleteDegreeCourse() {
        this.$emit("deleteDegreeCourse");
        this.$emit("update:showDeleteDegreeCourse", false);
      }
    }
}
</script>