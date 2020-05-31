<template>
  <v-container>
    <v-row>
      <h2 class="pl-5 mb-5">News</h2>
      <v-spacer></v-spacer>
      <v-btn
        color="primary mr-5"
        dark
        @click.stop="addNewsModal = true"
        v-if="this.role === 'DEAN' || this.role === 'RECTOR'"
      >Add news</v-btn>
    </v-row>
    <v-card class="mb-6" v-for="item in news" :key="item.id">
      <v-card-title>{{item.title}}</v-card-title>
      <v-card-text>{{item.description}}</v-card-text>
      <v-row>
      <v-card-subtitle class="ml-3">{{"Added by " + item.createdBy.firstName + " " + item.createdBy.lastName}}</v-card-subtitle>
      <v-spacer></v-spacer>
      <v-card-subtitle class="mr-3">{{item.createdAt}}</v-card-subtitle>
      </v-row>
    </v-card>
    <AddNewsModal
      v-if="this.role === 'DEAN' || this.role === 'RECTOR'"
      :addNewsModal.sync="addNewsModal"
      @addNews="addNews"
    ></AddNewsModal>
  </v-container>
</template>

<script>
import AddNewsModal from "./AddNews/AddNews";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      role: "",
      addNewsModal: false
    };
  },
  components: { AddNewsModal },
  computed: mapGetters(["news"]),
  async created() {
    this.role = localStorage.getItem("role");
    await this.getAnnoucements();
  },
  methods: {
    ...mapActions(["addAnnoucement", "getAnnoucements"]),
    async addNews(data) {
      this.addNewsModal = false;
      data.createdById = localStorage.getItem("userId");
      await this.addAnnoucement(data);
    }
  }
};
</script>

<style scoped>
</style>