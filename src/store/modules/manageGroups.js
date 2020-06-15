/* eslint-disable */
import axios from 'axios';
import promiseWrapper from '../../utils/promiseWrapper';

const state = {
    degreeCourses: []
};

const mutations = {
    setDegreeCourses(state, payload) {
        state.degreeCourses = payload;
    }
};

const actions = {
    async getDegreeCourses({ commit }) {
        const { res, err } = await promiseWrapper(axios.get('/degreeCourses'));

        if (res)
            commit('setDegreeCourses', res.data)
        else
            console.log(err);
    }
};

const getters = {
    degreeCourses: state => state.degreeCourses
};

export default {
    state,
    actions,
    getters,
    mutations
}