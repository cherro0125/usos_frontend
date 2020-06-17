<template>
  <v-container>
    <h2 class="ml-4 mb-8">Payments</h2>
    <v-data-table hide-default-footer :headers="headers" :items="payments" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-btn small class="mr-2" @click="showPaymentDetails(item)">details</v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="detailsModal" persistent max-width="800">
      <v-card class="pa-12">
        <v-card-title class="headline justify-center">Paid by</v-card-title>
        <div class="ml-12" v-if="paymentDetails">
          <p>
            <span>name:</span>
            <span class="ml-4">{{paymentDetails.payer.firstName}}</span>
          </p>
          <p>
            <span>surname:</span>
            <span class="ml-4">{{paymentDetails.payer.lastName}}</span>
          </p>
          <p>
            <span>email:</span>
            <span class="ml-4">{{paymentDetails.payer.username}}</span>
          </p>
        </div>
        <v-card-actions class="justify-center">
          <v-btn text @click="detailsModal = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      ],
      detailsModal: false,
      paymentDetails: ""
    };
  },
  computed: mapGetters(["payments"]),
  methods: {
    ...mapActions(["getAllPayments"]),
    showPaymentDetails(item) {
      this.paymentDetails = item;
      this.detailsModal = true;
    }
  },
  async created() {
    await this.getAllPayments();
  }
};
</script>

<style scoped>
</style>