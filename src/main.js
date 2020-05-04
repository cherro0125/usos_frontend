import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import Notifications from 'vue-notification'
import router from './router';
import store from './store/store';
import axios from 'axios';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL || 'http://localhost:2137/api';

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
}

Vue.use(Notifications)
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
