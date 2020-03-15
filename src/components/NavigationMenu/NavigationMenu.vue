<template>
  <v-navigation-drawer v-model="showDrawer" app clipped>
    <v-list dense>
      <v-list-item>
        <v-list-item-action>
          <v-avatar color="indigo">
            <v-icon dark>mdi-account-circle</v-icon>
          </v-avatar>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>email@costam.pl</v-list-item-title>
          <v-list-item-subtitle>Student</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawer"],
  computed: {
    showDrawer: {
      get() {
        return this.drawer;
      },
      set() {
        this.$emit("update:drawer", this.showDrawer);
      }
    }
  }
};
</script>

<style>
</style>