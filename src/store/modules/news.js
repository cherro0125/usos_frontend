/* eslint-disable */
import axios from 'axios';
import promiseWrapper from '../../utils/promiseWrapper';

const state = {
    news: []
};

const mutations = {
    setNews(state, payload) {
        state.news = payload;
    }
};

const actions = {
    async addAnnoucement({ commit }, data) {
        commit('setNews', [data]);
        
    },
    async getAnnoucements({ commit }, data) {

    }
};

const getters = {
    news: state => state.news
};

export default {
    state,
    actions,
    getters,
    mutations
}