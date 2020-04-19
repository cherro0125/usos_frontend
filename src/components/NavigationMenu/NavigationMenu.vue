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
      <v-list-item class="list-items" v-for="item in items" :key="item.title" link :to="item.route">
        <v-list-item-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawer"],
  data() {
    return {
      items: [
        {
          title: "grades",
          icon: "grade",
          route: "/grades"
        },
        {
          title: "scholarships",
          icon: "school",
          route: "/scholarships"
        }
      ]
    };
  },
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
.list-items {
  margin-left: 0.5vw;
}
</style>