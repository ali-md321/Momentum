// SearchModal.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAction } from '../../actions/userAction';

function SearchModal({ onClose, onSelectUser }) {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { searchUsers = [] } = useSelector(state => state.searchUsers || []);

  useEffect(() => {
    if (query.trim()) {
      const timeout = setTimeout(() => dispatch(searchUserAction(query)), 300);
      return () => clearTimeout(timeout);
    }
  }, [query, dispatch]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl overflow-hidden shadow-lg">
        <div className="p-4 border-b font-bold flex justify-between items-center">
          <span>Search Users</span>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="p-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
            placeholder="Search by username..."
          />
          {searchUsers.length === 0 && query && (
            <div className="text-gray-500 text-sm">No users found.</div>
          )}
          {searchUsers.map(user => (
            <div
              key={user._id}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelectUser(user)}
            >
              <img
                src={user.avatar?.url || '/default.png'}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
