
// client/src/redux/reducers/friendReducer.js
const initialState = {
    searchResults: [],
    friends: [],
    recommendations: [],
    error: null
  };
  
  const friendReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEARCH_USERS_SUCCESS':
        return { ...state, searchResults: action.payload, error: null };
      case 'SEARCH_USERS_FAIL':
        return { ...state, searchResults: [], error: action.payload };
      case 'GET_FRIENDS_SUCCESS':
        return { ...state, friends: action.payload, error: null };
      case 'GET_FRIENDS_FAIL':
        return { ...state, friends: [], error: action.payload };
      case 'GET_FRIEND_RECOMMENDATIONS_SUCCESS':
        return { ...state, recommendations: action.payload, error: null };
      case 'GET_FRIEND_RECOMMENDATIONS_FAIL':
        return { ...state, recommendations: [], error: action.payload };
      default:
        return state;
    }
  };
  
  export default friendReducer;