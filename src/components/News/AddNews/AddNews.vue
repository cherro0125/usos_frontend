<template>
  <v-row justify="center">
    <v-dialog v-model="addNewsModal" persistent max-width="800">
      <v-card class="pa-12">
        <v-card-title class="headline justify-center">Add news</v-card-title>
        <v-text-field v-model="newsTitle" label="title"></v-text-field>
        <v-textarea v-model="newsDescription" name="input-7-1" auto-grow row-height="5vh" label="description"></v-textarea>
        <v-card-actions class="justify-center">
          <v-btn text @click="$emit('update:addNewsModal', false)">Cancel</v-btn>
          <v-btn text  @click="addNews">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      newsTitle: "",
      newsDescription: ""
    };
  },
  props: ["addNewsModal"],
  methods: {
    addNews() {
      const data = {
        title: this.newsTitle,
        description: this.newsDescription
      };
      this.$emit("addNews", data);
      this.$emit("update:addNewsModal", false)
    }
  }
};
</script>