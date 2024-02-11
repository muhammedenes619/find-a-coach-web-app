import axios from 'axios';
export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };
    try {
      const token = context.rootGetters.token;
      const response = await axios.put(
        `https://coach-finder-webapp-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` +
          token,
        coachData
      );
      if (response) {
        console.log('all done');
      }

      context.commit('registerCoach', {
        ...coachData,
        id: userId,
      });
    } catch (error) {
      alert('error occurred');
    }
  },
  async loadCoaches(context, payload) {
    if (!payload.refreshFroce && !context.getters.shouldUpdate) {
      return;
    }
    const response = await axios.get(
      `https://coach-finder-webapp-default-rtdb.firebaseio.com/coaches.json`
    );
    const data = response.data;
    console.log(data);
    const coaches = [];
    for (const key in data) {
      const coach = {
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        description: data[key].description,
        hourlyRate: data[key].hourlyRate,
        areas: data[key].areas,
        id: key,
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimeStamp', coaches);
  },
};
