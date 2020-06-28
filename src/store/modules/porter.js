/* eslint-disable */
import axios from 'axios';
import promiseWrapper from '../../utils/promiseWrapper';

const state = {
    roomKeys: []
};

const mutations = {
    setRoomKeys(state, payload) {
        state.roomKeys = payload;
    }
};

const actions = {
    async getAllKeys({ commit }) {
        const { res, err } = await promiseWrapper(axios.get(`/keys/all`));
        if (res) {
            console.log(res)
            commit('setRoomKeys', res.data);
        }
        else
            console.log(err)
    },
    async getAllAvailableKeys({ commit }) {
        const { res, err } = await promiseWrapper(axios.get(`/keys/allAvailableKeys`));
        if (res) {
            console.log(res)
            commit('setRoomKeys', res.data);
        }
        else
            console.log(err)
    },
    async getAllGivenKeys({ commit }) {
        const { res, err } = await promiseWrapper(axios.get(`/keys/allGivenKeys`));
        if (res) {
            console.log(res)
            commit('setRoomKeys', res.data);
        }
        else
            console.log(err)
    },
    async temp({ commit }) {
        const { res, err } = await promiseWrapper(axios.get(`/keys/all/${localStorage.getItem("userId")}`));
        if (res)
            commit('setCourseData', res.data);
        else
            console.log(err)
    },
    async giveKeys({ commit }, data) {
        const { res, err } = await promiseWrapper(axios.post('/keys/giveKeys', data));
        if (res)
            console.log(res)
        if (err)
            console.log(err)
    },
    async returnKeys({ commit }, data) {
        const { res, err } = await promiseWrapper(axios.post('/keys/returnKeys', data));
        if (res)
            console.log(res)
        if (err)
            console.log(err)
    },
    async getTGradesValues({ commit }) {
        const { res, err } = await promiseWrapper(axios.get('util/enum/GradeValueType/values'));
        if (res)
            commit("setGradesValues", res.data.enumValues);
        else
            console.log(err);
    },
    async getTCourseStudentsData({ commit }, data) {
        const { id, course, students } = data;
        const { res, err } = await promiseWrapper(axios.get(`/grade/lecturer/${id}`));
        if (res) {
            const courseData = res.data.filter(element => element.courseGroup.name === course)
            const courseStudentsData = students;
            courseStudentsData.forEach(element => {
                const firstTerm = courseData.find(el => el.examDateType === "FIRST" && element.id === el.assignedUser.id);
                const secondTerm = courseData.find(el => el.examDateType === "SECOND" && element.id === el.assignedUser.id);
                element.firstTerm = firstTerm ? firstTerm.value : "";
                element.secondTerm = secondTerm ? secondTerm.value : "";
                element.firstTermId = firstTerm ? firstTerm.id : "";
                element.secondTermId = secondTerm ? secondTerm.id : "";
            });
            commit("setCourseStudentsData", courseStudentsData);
        }
        else
            console.log(err)
    },
    async removeTGrade({ commit }, id) {
        const { res, err } = await promiseWrapper(axios.delete(`/grade/${id}/delete`));

        return res ? true : false;
    }
};

const getters = {
    roomKeys: state => state.roomKeys
};

export default {
    state,
    actions,
    getters,
    mutations
}
