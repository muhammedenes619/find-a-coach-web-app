export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    const isLoggedIn = !!state.token;
    console.log(isLoggedIn);
    return isLoggedIn;
  },
};
