import Vue from "vue";
import Vuex from "vuex";
import { auth } from "../Firebase";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    checkAuth({ commit }) {
      auth.onAuthStateChanged(function(user) {
        if (user) {
          commit("setUser", user);
        } else {
          commit("setUser", null);
        }
      });
    },

    async register({ commit }, { name, email, password }) {
      await auth.createUserWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      await user.updateProfile({
        displayName: name,
      });
      commit("setUser", user);
    },
    async login({ commit }, { email, password }) {
      await auth.signInWithEmailAndPassword(email, password);
      commit("setUser", auth.currentUser);
    },
    async logout({ commit }) {
      await auth.signOut();
      commit("setUser", null);
    },

    async updatePassword({ commit }, { newPassword }) {
      const user = auth.currentUser;
      await user.updatePassword(newPassword);
      commit("setUser", user);
    },
  },
  modules: {},
});

export default store;

// Initial load
store.dispatch("checkAuth");
