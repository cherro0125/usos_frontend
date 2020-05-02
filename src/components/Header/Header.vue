<template>
  <v-container>
    <v-app-bar app clipped-left :dark="$vuetify.theme.dark">
      <v-app-bar-nav-icon  v-if="isLoggedIn" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>USOS</v-toolbar-title>
      <v-row v-if="isLoggedIn" align="end" justify="end">
        <DropdownMenu :dropdownMenu.sync="dropdownMenu"></DropdownMenu>
        <v-btn class="ml-3" @click='userLogout'>
          <span>LogOut</span>
          <v-icon class="ml-2">logout</v-icon>
        </v-btn>
      </v-row>
      <v-row v-else justify="end">
        <v-btn class="ml-3" to="/login">
          <span>Login</span>
          <v-icon class="ml-2">input</v-icon>
        </v-btn>
      </v-row>
    </v-app-bar>
    <NavigationMenu v-if="isLoggedIn" :drawer.sync="drawer"></NavigationMenu>
  </v-container>
</template>

<script>
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      drawer: true,
      dropdownMenu: false
    };
  },
  components: {
    NavigationMenu,
    DropdownMenu
  },
  computed: mapGetters(["isLoggedIn"]),
  methods: {
    ...mapActions(['logout']),
    userLogout() {
      this.logout();
      this.$router.push('/login')
    }
  }
};
</script>

<style>
</style>