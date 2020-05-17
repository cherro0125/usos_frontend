<template>
  <v-container>
    <h2 class="ml-2 mb-5">User registration</h2>
    <v-form @submit.prevent="createAccount()">
      <v-card class="pa-10">
        <v-card-title>Personal Data</v-card-title>
        <v-text-field v-model="userData.firstName" label="name"></v-text-field>
        <v-text-field v-model="userData.lastName" label="surname"></v-text-field>
        <v-text-field v-model="userData.phoneNumber" label="phone number"></v-text-field>
        <v-text-field v-model="userData.username" label="email"></v-text-field>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="userData.dateOfBirth"
              label="birthday date"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            v-model="userData.dateOfBirth"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="save"
          ></v-date-picker>
        </v-menu>
        <v-card-title>Address</v-card-title>
        <v-text-field v-model="userData.city" label="city"></v-text-field>
        <v-text-field v-model="userData.street" label="street"></v-text-field>
        <v-text-field v-model="userData.streetNumber" label="street number"></v-text-field>
        <v-text-field v-model="userData.houseNumber" label="house number"></v-text-field>
        <v-text-field v-model="userData.zipCode" label="zip code"></v-text-field>
        <v-card-title>Role</v-card-title>
        <v-select v-model="userData.role" label="role" class="mt-5" :items="roles" outlined></v-select>
        <v-card-actions class="justify-center">
          <v-btn type="submit">Create an account</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      roles: ["STUDENT", "LECTURER", "DEAN"],
      menu: false,
      userData: {
        role: "STUDENT",
        username: "",
        dateOfBirth: "",
        firstName: "",
        lastName: "",
        password: "test",
        phoneNumber: "",
        city: "",
        street: "",
        streetNumber: "",
        houseNumber: "",
        zipCode: ""
      }
    };
  },
  computed: mapGetters(["notification"]),
  methods: {
    ...mapActions(["register"]),
    async createAccount() {
      await this.register(this.userData);
      this.$notify({
        group: "foo",
        type: this.notification ? "success" : "error",
        title: this.notification
          ? "user successfully registered"
          : "error during user registration"
      });
      this.$router.push("/rector/accounts");
    },
    save(date) {
      this.$refs.menu.save(date);
    }
  }
};
</script>

<style scoped>
</style>