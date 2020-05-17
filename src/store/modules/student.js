/* eslint-disable */
import axios from 'axios';
import promiseWrapper from '../../utils/promiseWrapper';

const state = {
    grades: [],
};

const mutations = {
    setGrades(state, payload) {
        state.grades = payload;
    }
};

const actions = {
    async getGrades({ commit }, data) {
        const { res, err } = await promiseWrapper(axios.get(`/grade/student/${data}`));
        if (res) {
            const gradesData = res.data;
            const grades = gradesData.map(item => ({
                "name": item.courseGroup.course.name,
                "type": item.courseGroup.courseType,
                "ects": item.courseGroup.course.ectsPoints
            }))
                .filter((item, index, self) =>
                    index === self.findIndex(t => t.name === item.name)
                )
            grades.forEach(item => {
                const firstTerm = gradesData.find(el => (el.examDateType === "FIRST" && el.courseGroup.courseType === item.type && el.courseGroup.course.name === item.name));
                const secondTerm = gradesData.find(el => (el.examDateType === "SECOND" && el.courseGroup.courseType === item.type && el.courseGroup.course.name === item.name));
                item.firstTerm = firstTerm ? firstTerm.value : '';
                item.secondTerm = secondTerm ? secondTerm.value : '';
            });
            commit('setGrades', grades);
        }
    }
};

const getters = {
    grades: state => state.grades
};

export default {
    state,
    actions,
    getters,
    mutations
}