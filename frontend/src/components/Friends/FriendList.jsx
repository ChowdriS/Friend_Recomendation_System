// client/src/components/Friends/FriendList.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { sendFriendRequest } from '../../redux/actions/friendActions';

const FriendList = ({ friends, title, isRecommendation = false }) => {
  const dispatch = useDispatch();

  const handleAddFriend = (friendId) => {
    dispatch(sendFriendRequest(friendId));
  };

  return (
    <div>
      <h3>{title}</h3>
      {friends.length === 0 ? (
        <p>No friends to display.</p>
      ) : (
        <ul>
          {friends.map(friend => (
            <li key={friend._id}>
              {friend.username}
              {isRecommendation && (
                <button onClick={() => handleAddFriend(friend._id)}>Add Friend</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendList;