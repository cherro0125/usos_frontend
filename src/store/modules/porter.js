/* eslint-disable */
import axios from 'axios';
import promiseWrapper from '../../utils/promiseWrapper';

const state = {
    roomKeys: [],
    allUsers: []
};

const mutations = {
    setAllUsers(state, payload) {
        state.allUsers = payload;
    },
    setRoomKeys(state, payload) {
        state.roomKeys = payload;
    }
};

const actions = {
    async getAllUsers({commit}) {
        const { res, err } = await promiseWrapper(axios.get(`/user/all`));
        commit('setAllUsers', res.data);
    },
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
    emptyRoomKeys() {
        state.roomKeys = []
    }
};

const getters = {
    roomKeys: state => state.roomKeys,
    allUsers: state => state.allUsers
};

export default {
    state,
    actions,
    getters,
    mutations
}
