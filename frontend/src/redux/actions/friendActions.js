
// client/src/redux/actions/friendActions.js
import axios from 'axios';

export const searchUsers = (query) => async (dispatch, getState) => {
  try {
    const { userInfo } = getState().auth;
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    };
    const { data } = await axios.get(`/api/friends/search?query=${query}`, config);
    dispatch({ type: 'SEARCH_USERS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'SEARCH_USERS_FAIL', payload: error.response.data.message });
  }
};

export const sendFriendRequest = (friendId) => async (dispatch, getState) => {
  try {
    const { userInfo } = getState().auth;
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    };
    await axios.post('/api/friends/request', { friendId }, config);
    dispatch({ type: 'SEND_FRIEND_REQUEST_SUCCESS' });
  } catch (error) {
    dispatch({ type: 'SEND_FRIEND_REQUEST_FAIL', payload: error.response.data.message });
  }
};

export const getFriends = () => async (dispatch, getState) => {
  try {
    const { userInfo } = getState().auth;
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    };
    const { data } = await axios.get('/api/friends/list', config);
    dispatch({ type: 'GET_FRIENDS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'GET_FRIENDS_FAIL', payload: error.response.data.message });
  }
};

export const getFriendRecommendations = () => async (dispatch, getState) => {
  try {
    const { userInfo } = getState().auth;
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    };
    const { data } = await axios.get('/api/friends/recommendations', config);
    dispatch({ type: 'GET_FRIEND_RECOMMENDATIONS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'GET_FRIEND_RECOMMENDATIONS_FAIL', payload: error.response.data.message });
  }
};
