<template>
  <v-row justify="center">
    <v-col cols="8" align="center">
      <form>
        <v-text-field :counter="10" label="Name" required></v-text-field>
        <v-text-field label="E-mail" required></v-text-field>
        <v-select label="Item" required></v-select>
        <v-checkbox label="Do you agree?" required></v-checkbox>

        <v-btn class="mr-4">submit</v-btn>
        <v-btn>clear</v-btn>
      </form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>