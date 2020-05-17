
/* eslint-disable */
import axios from 'axios';
import promiseWrapper from '../../utils/promiseWrapper';

const state = {
    users: []
};

const mutations = {
    setUsers(state, payload) {
        state.users = payload;
    }
};

const actions = {
    async getUsers({ commit }, data) {
        const { res, err } = await promiseWrapper(axios.get(`/user/${data}/all`));
        commit('setUsers', res.data);
    },
    async deleteUser({ commit }, data) {
        const { res, err } = await promiseWrapper(axios.delete(`/user/${data}`));
    }
};

const getters = {
    users: state => state.users
};

export default {
    state,
    actions,
    getters,
    mutations
}