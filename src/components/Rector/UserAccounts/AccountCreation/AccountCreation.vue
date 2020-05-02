<template>
  <v-container>
    <v-form @submit.prevent="createAccount()">
      <v-card class="pa-10">
        <v-text-field v-model="username" label="email"></v-text-field>
        <v-select v-model="role" label="role" class="mt-5" :items="roles" outlined></v-select>
        <v-card-actions class="justify-center">
          <v-btn type="submit">Create Account</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      roles: ["student", "lecturer", "dean"],
      role: "student",
      username: ''
    };
  },
  methods: {
    ...mapActions(['register']),
    async createAccount() {
        const params = {
            'username': this.username,
            'password': 'test',
            'role': this.role.toUpperCase()
        };
        await this.register(params);
    }
  }
};
</script>

<style scoped>
</style>