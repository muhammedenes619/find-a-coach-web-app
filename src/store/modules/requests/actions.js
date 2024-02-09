import axios from 'axios';
export default {
  async contactCoach(context, payload) {
    const newRequest = {
      email: payload.email,
      message: payload.message,
    };
    const response = await axios.post(
      `https://coach-finder-webapp-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      newRequest
    );
    const data = response.data;
    newRequest.id = data.name;
    newRequest.coachId = payload.coachId;
    context.commit('addRequests', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const response = await axios.get(
      `https://coach-finder-webapp-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );
    const data = response.data;
    const requests = [];
    for (const key in data) {
      const req = {
        id: key,
        coachId: coachId,
        email: data[key].email,
        message: data[key].message,
      };
      requests.push(req);
    }
    context.commit('setRequests', requests);
  },
};
