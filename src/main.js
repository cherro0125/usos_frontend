import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store/store';
import axios from 'axios';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL || 'http://localhost:2137/api';

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Autorization'] = 'Bearer ' + token;
}

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
