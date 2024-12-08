// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Home/DashBoard.jsx';
import Login from './components/Auth/Login';
import Signup from './components/Auth/SIgnup.jsx';
import FriendList from './components/Friends/FriendList';
import FriendSearch from './components/Friends/FriendSearch';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/friends" component={FriendList} />
          <Route path="/search" component={FriendSearch} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;