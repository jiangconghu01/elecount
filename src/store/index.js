import Vue from 'vue';
import Vuex from 'vuex';
import utils from '../util/util.js';

Vue.use(Vuex);
const state = {
    'school': '1',
    'userInfor': {}
};
const getters = {
    school(state) {
        return state.school;
    },
    userInfor(state) {
        return state.userInfor;
    }
};
const mutations = {
    setSchool(state, param) {
        state.school = param;
    },
    setUserInfor(state, param) {
        state.userInfor = param;
    }
};
const actions = {
    schoolAction(context, param) {
        context.commit('setSchool', param);
    }
};
const vuexStore = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});
export default vuexStore;