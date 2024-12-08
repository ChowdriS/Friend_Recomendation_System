// client/src/redux/reducers/authReducer.js
const initialState = {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
    error: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
      case 'SIGNUP_SUCCESS':
        return { ...state, userInfo: action.payload, error: null };
      case 'LOGIN_FAIL':
      case 'SIGNUP_FAIL':
        return { ...state, userInfo: null, error: action.payload };
      case 'LOGOUT':
        return { ...state, userInfo: null, error: null };
      default:
        return state;
    }
  };
  
  export default authReducer;