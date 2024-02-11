import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  state() {
    return {
      token: null,
      userId: null,
      tokenExpiration: null,
    };
  },
  mutations,
  actions,
  getters,
};
