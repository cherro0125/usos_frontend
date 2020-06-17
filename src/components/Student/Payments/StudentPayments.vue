<template>
  <v-container>
    <h2 class="ml-4 mb-8">Payments</h2>
    <v-data-table hide-default-footer :headers="headers" :items="payments" class="elevation-1"></v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      headers: [
        { text: "type", value: "purposeType" },
        { text: "payable to", value: "payableTo" },
        { text: "description", value: "details" },
        { text: "status", value: "status" }
      ]
    };
  },
  computed: mapGetters(["payments"]),
  methods: {
    ...mapActions(["getPaymentsByPayerId"])
  },
  async created() {
    const id = localStorage.getItem("userId");
    await this.getPaymentsByPayerId(id);
  }
};
</script>

<style scoped>
</style>