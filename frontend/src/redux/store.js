// client/src/redux/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import friendReducer from './reducers/friendReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  friend: friendReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;


