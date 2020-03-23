import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    calendarCourses: []
  },
  mutations: {
    ADD_COURSE: (state, course) => state.calendarCourses.push(course),
    REMOVE_COURSE: (state, name) => {
      for (let i = 0; i < state.calendarCourses.length; i++) {
        if (name === state.calendarCourses[i].title) {
          state.calendarCourses.splice(i);
        }
      }
    }
  },
  getters: {
    getLength(state) {
      return state.calendarCourses.length;
    }
  }
});
