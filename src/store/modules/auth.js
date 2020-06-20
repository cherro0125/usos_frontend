
/* eslint-disable */
import axios from 'axios';
import promiseWrapper from '../../utils/promiseWrapper';
import user from "./user";

const state = {
    token: localStorage.getItem('token') || '',
    showSuccessNotification: false,
    showFacebookAlreadyExistsNotification: false,
    hasFacebookAccountLinked: localStorage.getItem('hasFacebookAccountLinked') || false
};

const mutations = {
    setLoggedIn(state, payload) {
        state.token = payload;
    },
    setNotification(state, payload) {
        state.showSuccessNotification = payload;
    },
    setHasFacebookAccountLinked(state,payload){
        state.hasFacebookAccountLinked  = payload;
    },
    setFacebookAlreadyExistsNotification(state,payload){
        state.showFacebookAlreadyExistsNotification = payload;
    }
};

const actions = {
    async login({ commit }, params) {
        const { res, err } = await promiseWrapper(axios.post('/auth/login', params));
        if (res) {
            console.log(res);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);
            localStorage.setItem("username", res.data.user.username);
            localStorage.setItem("userId", res.data.user.id);
            localStorage.setItem("hasFacebookAccountLinked",res.data.user.hasFacebookAccountLinked);
            axios.defaults.headers.common = {'Authorization': `Bearer ${res.data.token}`}
            commit('setLoggedIn', res.data.token);
            commit('setHasFacebookAccountLinked',res.data.user.hasFacebookAccountLinked);
        }
        else
            console.log(err);
    },
    async loginUsingFacebook({ commit }, params) {
        const { res, err } = await promiseWrapper(axios.post('/auth/facebook/login', params));
        if (res) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);
            localStorage.setItem("username", res.data.user.username);
            localStorage.setItem("userId", res.data.user.id);
            localStorage.setItem("hasFacebookAccountLinked",res.data.user.hasFacebookAccountLinked);
            axios.defaults.headers.common = {'Authorization': `Bearer ${res.data.token}`}
            commit('setLoggedIn', res.data.token);
            commit('setHasFacebookAccountLinked',res.data.user.hasFacebookAccountLinked)
        }
        else
            console.log(err);
    },
    async linkToFacebook({commit},params){
        const { res, err } = await promiseWrapper(axios.post('/facebook/auth/link', params));
        if (res) {
            if(res.data.status === 'LINK_ALREADY_EXISTS'){
                commit('setFacebookAlreadyExistsNotification',true);
            }
            localStorage.setItem("hasFacebookAccountLinked",res.data.user.hasFacebookAccountLinked);
            commit('setHasFacebookAccountLinked',res.data.user.hasFacebookAccountLinked)
        }
        else
            console.log(err);
    },
    async unlinkFromFacebook({commit},userId){
        const { res, err } = await promiseWrapper(axios.get(`/facebook/auth/unlink/${userId}`));
        if (res) {
            localStorage.setItem("hasFacebookAccountLinked",res.data.user.hasFacebookAccountLinked);
            commit('setHasFacebookAccountLinked',res.data.user.hasFacebookAccountLinked)
        }
        else
            console.log(err);
    },
    async register({ commit }, params) {
        const { res, err } = await promiseWrapper(axios.post('/auth/register', params));
        commit('setNotification', res ? true : false);
    },
    logout({ commit }) {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('hasFacebookAccountLinked');
        delete axios.defaults.headers.common['Authorization'];
        commit("setLoggedIn", '');
    }
};

const getters = {
    isLoggedIn: state => !!state.token,
    notification: state => state.showSuccessNotification,
    isFacebookAccountLinked: state => state.hasFacebookAccountLinked
};

export default {
    state,
    actions,
    getters,
    mutations
}
