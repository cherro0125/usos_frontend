<template>
  <v-app>
    <v-app-bar app clipped-left :dark="$vuetify.theme.dark">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>USOS</v-toolbar-title>
      <v-spacer></v-spacer>
      <DropdownMenu :dropdownMenu.sync="dropdownMenu"></DropdownMenu>
      <v-btn>
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>
    <NavigationMenu :drawer.sync="drawer"></NavigationMenu>
  </v-app>
</template>

<script>
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import DropdownMenu from "../DropdownMenu/DropdownMenu"
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
  }
};
</script>

<style>
</style>