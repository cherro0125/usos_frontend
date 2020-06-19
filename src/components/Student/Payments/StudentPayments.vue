<template>
  <v-container>
    <h2 class="ml-4 mb-8">Payments</h2>
    <v-data-table hide-default-footer :headers="headers" :items="payments" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-btn v-if="item.status === 'NEW' || item.status === 'CREATED'" small class="mr-2" @click="pay(item.id)">pay</v-btn>
        <hr class="line" v-else>
      </template>
    </v-data-table>
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
        { text: "status", value: "status" },
        { text: "actions", value: "actions" }
      ]
    };
  },
  computed: mapGetters(["payments"]),
  methods: {
    ...mapActions(["getPaymentsByPayerId"]),
    async pay(item) {
      console.log(item)
    }
  },
  async created() {
    const id = localStorage.getItem("userId");
    await this.getPaymentsByPayerId(id);
  }
};
</script>

<style scoped>
 .line {
   width: 55px;
 }
</style>