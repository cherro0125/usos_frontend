import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import lecturer from './modules/lecturer';
import user from './modules/user';
import student from './modules/student';
import news from './modules/news'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      auth,
      lecturer,
      user,
      student,
      news
    }
  });