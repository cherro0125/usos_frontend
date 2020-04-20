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
          <v-list-item-subtitle>{{role}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div v-if="role === 'student'">
        <v-list-item
          class="list-items"
          v-for="item in studentItems"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div v-else-if="role === 'lecturer'">
        <v-list-item
          class="list-items"
          v-for="item in lecturerItems"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div v-else-if="role === 'dean'">
        <v-list-item
          class="list-items"
          v-for="item in deanItems"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div v-else-if="role === 'admin'">
        <v-list-item
          class="list-items"
          v-for="item in adminItems"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawer"],
  data() {
    return {
      lecturerItems: [
        {
          title: "news",
          icon: "announcement",
          route: "/news"
        }
      ],
      adminItems: [
        {
          title: "news",
          icon: "announcement",
          route: "/news"
        }
      ],
      deanItems: [
        {
          title: "news",
          icon: "announcement",
          route: "/news"
        }
      ],
      studentItems: [
        {
          title: "news",
          icon: "announcement",
          route: "/news"
        },
        {
          title: "grades",
          icon: "grade",
          route: "/grades"
        },
        {
          title: "scholarships",
          icon: "school",
          route: "/scholarships"
        },
        {
          title: "payments",
          icon: "attach_money",
          route: "/payments"
        },
        {
          title: "applications",
          icon: "description",
          route: "/applications"
        }
      ],
      role: ""
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
  },
  created() {
    this.role = localStorage.getItem("role");
  }
};
</script>

<style>
.list-items {
  margin-left: 0.5vw;
}
</style>