
/* eslint-disable */
const state = {
    isLoggedIn: false
};

const mutations = {
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    }
};

const actions = {
    login({ commit }, credentials) {
        commit('setLoggedIn', true);
    },
    logout({commit}) {
        commit('setLoggedIn', false);
    }
};

const getters = {
    // isLoggedIn: state => !!state.token
    isLoggedIn: state => state.isLoggedIn
};

export default {
    state,
    actions,
    getters,
    mutations
}