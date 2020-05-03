
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
        const { res, err } = await promiseWrapper(axios.post('/auth/login', params));
        if (res) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
            commit('setLoggedIn', true);
        }
        else 
            console.log(err);
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