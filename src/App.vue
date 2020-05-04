<template>
  <v-app>
    <Header></Header>
    <v-content>
      <router-view></router-view>
      <notifications group="foo" position="top center" />
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },

  data: () => ({})
};
</script>
