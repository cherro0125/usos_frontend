import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import lecturer from './modules/lecturer';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      auth,
      lecturer
    }
  });