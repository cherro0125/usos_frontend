/* eslint-disable */
import axios from 'axios';
import promiseWrapper from '../../utils/promiseWrapper';

const state = {
    courseData: [],
    gradesValues: []
};

const mutations = {
    setCourseData(state, payload) {
        state.courseData = payload;
    },
    setGradesValues(state, payload) {
        state.gradesValues = payload;
    }
};

const actions = {
    async getCourseData({ commit }) {
        const { res, err } = await promiseWrapper(axios.get(`/course/group/${localStorage.getItem("userId")}`));
        if (res)
            commit('setCourseData', res.data);
        else
            console.log(err)

    },
    async addGrade({ commit }, data) {
        const { res, err } = await promiseWrapper(axios.post('/grade/add', data));
        if (err)
            console.log(err)
    },
    async getGradesValues({commit}) {
        const { res, err } = await promiseWrapper(axios.get('util/enum/GradeValueType/values'));
        if(res)
            commit("setGradesValues", res.data.enumValues);
        else
            console.log(err);
    }
};

const getters = {
    courseData: state => state.courseData,
    gradesValues: state => state.gradesValues
};

export default {
    state,
    actions,
    getters,
    mutations
}