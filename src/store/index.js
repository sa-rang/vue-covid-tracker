import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    selectedCountryData: null,
  },
  mutations: {
    setSelectedCountryData(state, value) {
      console.log("setdata");
      state.selectedCountryData = value;
    },
  },
});
