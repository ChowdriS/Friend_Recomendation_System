// client/src/redux/actions/authActions.js
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/auth/login', { email, password });
    dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.message });
  }
};

export const signup = (username, email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/auth/signup', { username, email, password });
    dispatch({ type: 'SIGNUP_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: 'SIGNUP_FAIL', payload: error.response.data.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: 'LOGOUT' });
};