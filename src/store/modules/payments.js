/* eslint-disable */
import axios from 'axios';
import promiseWrapper from '../../utils/promiseWrapper';

const state = {
    payments: []
};

const mutations = {
    setPayments(state, payload) {
        state.payments = payload;
    }
};

const actions = {
    async getPaymetnsByPayerId({ commit }, id) {
        const { res, err } = await promiseWrapper(axios.get(`/payment/${id}`));

        if (res)
            commit('setPayments', res.data);
        else
            console.log(err);
    },
    async getAllPayments({ commit }) {
        const { res, err } = await promiseWrapper(axios.get(`/payment/all`));

        if (res)
            commit('setPayments', res.data);
        else
            console.log(err);
    }
};

const getters = {
    payments: state => state.payments
};

export default {
    state,
    actions,
    getters,
    mutations
}