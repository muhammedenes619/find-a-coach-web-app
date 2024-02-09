export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  setCoaches(state, payload) {
    state.coaches = payload;
    console.log(payload);
  },
  setFetchTimeStamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
