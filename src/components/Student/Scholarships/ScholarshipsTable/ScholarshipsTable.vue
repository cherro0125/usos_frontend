<template>
  <v-container>
    <v-data-table
      hide-default-footer
      :dark="$vuetify.theme.dark"
      :headers="headers"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Type",
          align: "start",
          value: "name"
        },
        { text: "Amount per month", value: "amount" },
        { text: "From", value: "from" },
        { text: "To", value: "to" }
      ]
    };
  }
};
</script>

<style scoped>
</style>