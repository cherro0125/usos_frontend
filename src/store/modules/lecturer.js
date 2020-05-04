/* eslint-disable */
import axios from 'axios';
import promiseWrapper from '../../utils/promiseWrapper';

const state = {
    courseData: []
};

const mutations = {
    setCourseData(state, payload) {
        state.courseData = payload;
    }
};

const actions = {
    async getCourseData({ commit }, data) {
        const { res, err } = await promiseWrapper(axios.get(`/course/group/${data}`));
        if (res)
            commit('setCourseData', res.data);

    }
};

const getters = {
    courseData: state => state.courseData
};

export default {
    state,
    actions,
    getters,
    mutations
}