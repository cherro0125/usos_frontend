/* eslint-disable */
import axios from 'axios';
import promiseWrapper from '../../utils/promiseWrapper';
import Vue from 'vue';

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
            Vue.notify({
                group: "foo",
                type: "error",
                title: "Connection lost"
            })
    },
    async getDefinedGroups({ commit },id) {
        const { res, err } = await promiseWrapper(axios.get(`/definedGroups/${id}`));
        if (res)
            commit('setDefinedGroups', res.data)
        else
            Vue.notify({
                group: "foo",
                type: "error",
                title: "Connection lost"
            })
    },
    async clearDefinedGroups({ commit }) {
        commit('setDefinedGroups', "")
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