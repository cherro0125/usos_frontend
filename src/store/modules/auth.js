
/* eslint-disable */
import axios from 'axios';
import promiseWrapper from '../../utils/promiseWrapper';

const state = {
    isLoggedIn: false
};

const mutations = {
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    }
};

const actions = {
    login({ commit }, credentials) {
        if (credentials.username === "student")
            localStorage.setItem("role", "student");

        else if (credentials.username === "admin")
            localStorage.setItem("role", "admin");

        else if (credentials.username === "dean")
            localStorage.setItem("role", "dean");

        else if (credentials.username === "lecturer")
            localStorage.setItem("role", "lecturer");

        commit('setLoggedIn', true);
    },
    async register({ commit }, data) {
        const { res, err } = await promiseWrapper(axios.post('/auth/register'));
    },
    logout({ commit }) {
        localStorage.removeItem('role')
        commit('setLoggedIn', false);
    }
};

const getters = {
    // isLoggedIn: state => !!state.token
    isLoggedIn: state => state.isLoggedIn
};

export default {
    state,
    actions,
    getters,
    mutations
}