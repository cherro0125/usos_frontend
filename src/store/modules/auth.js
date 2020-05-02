
/* eslint-disable */
import axios from 'axios';
import promiseWrapper from '../../utils/promiseWrapper';

const state = {
    token: localStorage.getItem('token') || '',
};

const mutations = {
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    }
};

const actions = {
    async login({ commit }, params) {
        // if (credentials.username === "student")
        //     localStorage.setItem("role", "student");

        // else if (credentials.username === "admin")
        //     localStorage.setItem("role", "admin");

        // else if (credentials.username === "dean")
        //     localStorage.setItem("role", "dean");

        // else if (credentials.username === "lecturer")
        //     localStorage.setItem("role", "lecturer");

        const { res, err } = await promiseWrapper(axios.post('/test', params));
        if (res) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
            commit('setLoggedIn', true);
        }
    },
    async register({ commit }, params) {
        const { res, err } = await promiseWrapper(axios.post('/auth/register', params));
    },
    logout({ commit }) {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        commit('setLoggedIn', false);
    }
};

const getters = {
    isLoggedIn: state => !!state.token
    // isLoggedIn: state => state.isLoggedIn
};

export default {
    state,
    actions,
    getters,
    mutations
}