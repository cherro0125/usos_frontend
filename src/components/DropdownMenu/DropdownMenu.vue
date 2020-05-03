<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
      <template v-slot:activator="{ on }">
        <v-btn color="indigo" dark v-on="on">
            <span class="mr-2">Settings</span>
            <v-icon>settings</v-icon>
        </v-btn>
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
              <v-list-item-title>{{username}}</v-list-item-title>
              <v-list-item-subtitle>{{role}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="theme" color="purple"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Dark theme: {{theme ? 'on' : 'off'}}</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="onCancel">Cancel</v-btn>
          <v-btn color="primary" text @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: this.$vuetify.theme.dark,
      role: '',
      username: ''
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
  },
  methods: {
    onSave() {
      this.menu = !this.menu;
      this.$vuetify.theme.dark = this.theme;
    },
    onCancel() {
      this.menu = !this.menu;
      this.theme = this.$vuetify.theme.dark;
    }
  },
  watch: {
    menu() {
      if (!this.menu) this.theme = this.$vuetify.theme.dark;
    }
  },
  created() {
    this.role = localStorage.getItem("role");
    this.username = localStorage.getItem("username");
  }
};
</script>

<style scoped>
</style>