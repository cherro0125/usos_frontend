<template>
  <v-content>
    <Header></Header>
    <Footer></Footer>
  </v-content>
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
