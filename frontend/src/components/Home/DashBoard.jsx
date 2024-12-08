// client/src/components/Home/Dashboard.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFriends, getFriendRecommendations } from '../../redux/actions/friendActions';
import FriendList from '../Friends/FriendList';
import FriendSearch from '../Friends/FriendSearch';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { friends, recommendations } = useSelector(state => state.friend);

  useEffect(() => {
    if (userInfo) {
      dispatch(getFriends());
      dispatch(getFriendRecommendations());
    }
  }, [dispatch, userInfo]);

  if (!userInfo) {
    return <p>Please log in to view your dashboard.</p>;
  }

  return (
    <div>
      <h2>Welcome, {userInfo.username}!</h2>
      <FriendSearch />
      <FriendList friends={friends} title="Your Friends" />
      <FriendList friends={recommendations} title="Recommended Friends" />
    </div>
  );
};

export default Dashboard;