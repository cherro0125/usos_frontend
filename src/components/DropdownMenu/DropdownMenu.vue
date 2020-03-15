<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
      <template v-slot:activator="{ on }">
        <v-btn color="indigo" dark v-on="on">Settings</v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar color="indigo">
                <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>email@costam.pl</v-list-item-title>
              <v-list-item-subtitle>Student</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="theme" color="purple"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Change theme</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" text @click="menu = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: this.$vuetify.theme.dark
    };
  },
  props: ["dropdownMenu"],
  computed: {
    menu: {
      get() {
        return this.dropdownMenu;
      },
      set(newValue) {
        this.$emit("update:dropdownMenu", newValue);
      }
    }
  }
};
</script>

<style scoped>
</style>