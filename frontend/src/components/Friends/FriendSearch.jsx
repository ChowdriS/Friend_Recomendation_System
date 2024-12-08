// client/src/components/Friends/FriendSearch.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers, sendFriendRequest } from '../../redux/actions/friendActions';

const FriendSearch = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { searchResults, error } = useSelector(state => state.friend);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchUsers(query));
  };

  const handleAddFriend = (friendId) => {
    dispatch(sendFriendRequest(friendId));
  };

  return (
    <div>
      <h3>Search for Friends</h3>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map(user => (
            <li key={user._id}>
              {user.username}
              <button onClick={() => handleAddFriend(user._id)}>Add Friend</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendSearch;