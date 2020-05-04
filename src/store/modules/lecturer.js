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
    async getCourseData({ commit }) {
        const { res, err } = await promiseWrapper(axios.get(`/course/group/${localStorage.getItem("userId")}`));
        if (res){
            console.log(res, res.data)
            commit('setCourseData', res.data);
        }
        else
            console.log(err)

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