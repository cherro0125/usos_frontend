/* eslint-disable */
import axios from 'axios';
import promiseWrapper from '../../utils/promiseWrapper';

const state = {
    degreeCourses: [],
    definedGroups: []
};

const mutations = {
    setDegreeCourses(state, payload) {
        state.degreeCourses = payload;
    },
    setDefinedGroups(state,payload){
        state.definedGroups = payload;
    }
};

const actions = {
    async getDegreeCourses({ commit }) {
        const { res, err } = await promiseWrapper(axios.get('/degreeCourses'));

        if (res)
            commit('setDegreeCourses', res.data)
        else
            console.log(err);
    },
    async getDefinedGroups({ commit },id) {
        const { res, err } = await promiseWrapper(axios.get(`/definedGroups/${id}`));
        if (res)
            commit('setDefinedGroups', res.data)
        else
            console.log(err);
    }
};

const getters = {
    degreeCourses: state => state.degreeCourses,
    definedGroups: state => state.definedGroups
};

export default {
    state,
    actions,
    getters,
    mutations
}