import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  school:'1',
}
const getters = {
  school (state) {
    return state.school
  }
}
const mutations = {
  setSchool (state, param) {
    state.school = param
  }
}
const actions = {
  schoolAction (context, param) {
    context.commit('setSchool', param)
  }
}
var vuexStore = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
export default vuexStore;