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
          <v-list-item-title>{{username}}</v-list-item-title>
          <v-list-item-subtitle>{{role}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div v-if="role === 'STUDENT'">
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
      <div v-else-if="role === 'LECTURER'">
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
      <div v-else-if="role === 'DEAN'">
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
      <div v-else-if="role === 'RECTOR'">
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
        },
        {
          title: "grades",
          icon: "grade",
          route: "/lecturer/grades"
        },
        {
          title: "syllabus",
          icon: "notes",
          route: ""
        },
      ],
      adminItems: [
        {
          title: "news",
          icon: "announcement",
          route: "/news"
        },
        {
          title: "users accounts",
          icon: "supervised_user_circle",
          route: "/rector/accounts"
        },
        {
          title: "payments",
          icon: "attach_money",
          route: ""
        },
        {
          title: "manage subjects",
          icon: "subject",
          route: ""
        },
        {
          title: "scholarship applications",
          icon: "school",
          route: ""
        }
      ],
      deanItems: [
        {
          title: "news",
          icon: "announcement",
          route: "/news"
        },
        {
          title: "manage subjects",
          icon: "subject",
          route: ""
        },
        {
          title: "manage groups",
          icon: "supervised_user_circle",
          route: "/dean/groups"
        },
        {
          title: "scholarships",
          icon: "school",
          route: ""
        },
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
          route: "/student/grades"
        },
        {
          title: "scholarships",
          icon: "school",
          route: "/student/scholarships"
        },
        {
          title: "payments",
          icon: "attach_money",
          route: "/student/payments"
        },
        {
          title: "applications",
          icon: "description",
          route: "/student/applications"
        }
      ],
      role: "",
      username: ''
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
    this.username = localStorage.getItem("username");
  }
};
</script>

<style>
.list-items {
  margin-left: 0.5vw;
}
</style>