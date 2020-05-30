<template>
  <v-container>
    <v-row>
      <h2 class="pl-5 mb-5">News</h2>
      <v-spacer></v-spacer>
      <v-btn
        color="primary mr-5"
        dark
        @click.stop="addNewsModal = true"
        v-if="this.role === 'DEAN'"
      >Add news</v-btn>
    </v-row>
    <p class="pa-5">
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    </p>
    <AddNewsModal v-if="this.role === 'DEAN'" :addNewsModal.sync="addNewsModal" @addNews="addNews">
    </AddNewsModal>
  </v-container>
</template>

<script>
import AddNewsModal from "./AddNews/AddNews";

export default {
  data() {
    return {
      role: "",
      addNewsModal: false
    };
  },
  components: { AddNewsModal },
  created() {
    this.role = localStorage.getItem("role");
  },
  methods: {
    addNews(data) {
      console.log(data)
      this.addNewsModal = false;
    }
  }
};
</script>

<style scoped>
</style>