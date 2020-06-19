/* eslint-disable */
import axios from 'axios';
import promiseWrapper from '../../utils/promiseWrapper';
import Vue from 'vue';

const state = {
    degreeCourses: [],
    definedGroups: [],
    degreeTypes: []
};

const mutations = {
    setDegreeCourses(state, payload) {
        state.degreeCourses = payload;
    },
    setDefinedGroups(state,payload){
        state.definedGroups = payload;
    },
    setDegreeTypes(state,payload){
        state.degreeTypes = payload;
    }
};

const actions = {
    async addDegreeCourses({ dispatch }, data) {
        const { res, err } = await promiseWrapper(axios.post('/degreeCourses/add', data));
        console.log(data);
        if (res)
            dispatch('getDegreeCourses');
        else{
            Vue.notify({
                group: "foo",
                type: "error",
                title: "Connection error"
            })
            console.log(err);
        }
            

    },
    async addDefinedGroups({ dispatch }, data) {
        const { res, err } = await promiseWrapper(axios.post('/definedGroups/add', data));
        console.log(data);
        if (res)
            dispatch('getDefinedGroups',data.degreeCourseId);
        else{
            Vue.notify({
                group: "foo",
                type: "error",
                title: "Connection error"
            })
            console.log(err);
        }
            

    },
    async getDegreeCourses({ commit }) {
        const { res, err } = await promiseWrapper(axios.get('/degreeCourses/all'));

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
    async getDegreeTypes({ commit }) {
        const { res, err } = await promiseWrapper(axios.get('util/enum/DegreeType/values'));
        if (res)
            commit("setDegreeTypes", res.data.enumValues);
        else
            console.log(err);
    },
    async clearDefinedGroups({ commit }) {
        commit('setDefinedGroups', "")
    }
};

const getters = {
    degreeCourses: state => state.degreeCourses,
    definedGroups: state => state.definedGroups,
    degreeTypes: state => state.degreeTypes
};

export default {
    state,
    actions,
    getters,
    mutations
}