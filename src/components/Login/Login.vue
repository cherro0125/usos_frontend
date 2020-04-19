<template>
  <v-content>
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-form @submit.prevent="login()">
            <v-card class="signin-card pa-8">
              <v-card-title class="justify-center signin-card-title">
                <h2>Log in</h2>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  type="text"
                  required
                  v-model="credentials.username"
                  placeholder="Login"
                ></v-text-field>
                <v-text-field
                  type="password"
                  required
                  v-model="credentials.password"
                  placeholder="Password"
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn type="submit">Log In</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {

    }
  }
};
</script>

<style scoped>
</style>