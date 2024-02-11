import axios from 'axios';
export default {
  async login(context, payload) {
    const response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDGLrOATA0ynVF0J1gCZ9X3gRuswbvn5UU',
      {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }
    );
    console.log(response);
    context.commit('setUser', {
      token: response.data.idToken,
      userId: response.data.localId,
      tokenExpiration: response.data.expiresIn,
    });
  },
  async signUp(context, payload) {
    const response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDGLrOATA0ynVF0J1gCZ9X3gRuswbvn5UU',
      {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }
    );
    console.log(response);
    context.commit('setUser', {
      token: response.data.idToken,
      userId: response.data.localId,
      tokenExpiration: response.data.expiresIn,
    });
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
