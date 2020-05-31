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
    async addAnnoucement({ commit, dispatch }, data) {
        const { res, err } = await promiseWrapper(axios.post('/news/add', data));

        if (res)
            dispatch('getAnnoucements');
        else
            console.log(err);

    },
    async getAnnoucements({ commit }) {
        const { res, err } = await promiseWrapper(axios.get('/news/all'));

        if (res)
            commit('setNews', res.data)
        else
            console.log(err);
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