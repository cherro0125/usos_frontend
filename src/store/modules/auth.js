
/* eslint-disable */
import axios from 'axios';
import promiseWrapper from '../../utils/promiseWrapper';

const state = {
    token: localStorage.getItem('token') || '',
};

const mutations = {
    setLoggedIn(state, payload) {
        state.token = payload;
    }
};

const actions = {
    async login({ commit }, params) {
        const { res, err } = await promiseWrapper(axios.post('/auth/login', params));
        if (res) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);
            localStorage.setItem("username", res.data.user.username);
            localStorage.setItem("userId", res.data.user.id);
            axios.defaults.headers.common = {'Authorization': `Bearer ${res.data.token}`}
            commit('setLoggedIn', res.data.token);
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
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        delete axios.defaults.headers.common['Authorization'];
        commit("setLoggedIn", '');
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