/* eslint-disable */
import axios from 'axios';
import promiseWrapper from '../../utils/promiseWrapper';

const state = {
    courseData: [],
    gradesValues: [],
    courseStudentsData: []
};

const mutations = {
    setCourseData(state, payload) {
        state.courseData = payload;
    },
    setGradesValues(state, payload) {
        state.gradesValues = payload;
    },
    setCourseStudentsData(state, payload) {
        state.courseStudentsData = payload;
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
    async getGradesValues({ commit }) {
        const { res, err } = await promiseWrapper(axios.get('util/enum/GradeValueType/values'));
        if (res)
            commit("setGradesValues", res.data.enumValues);
        else
            console.log(err);
    },
    async getCourseStudentsData({ commit }, data) {
        const { id, course, students } = data;
        const { res, err } = await promiseWrapper(axios.get(`/grade/lecturer/${id}`));
        ///1. retrieve all students, 2. add grade to student
        if (res) { console.log(res.data, students)
            const courseData = res.data.filter(element => element.courseGroup.name === course)
            const courseStudentsData = students;
            courseStudentsData.forEach(element => {
                const firstTerm = courseData.find(el => el.examDateType === "FIRST" && element.id === el.assignedUser.id);
                const secondTerm = courseData.find(el => el.examDateType === "SECOND" && element.id === el.assignedUser.id);
                element.firstTerm = firstTerm ? firstTerm.value : "";
                element.secondTerm = secondTerm ? secondTerm.value : "";
            });
            commit("setCourseStudentsData", courseStudentsData);
        }
        else
            console.log(err)
    }
};

const getters = {
    courseData: state => state.courseData,
    gradesValues: state => state.gradesValues,
    courseStudentsData: state => state.courseStudentsData
};

export default {
    state,
    actions,
    getters,
    mutations
}