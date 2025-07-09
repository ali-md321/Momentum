import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearSearchResults, searchUserAction } from '../../actions/userAction';
import SearchIcon from '@mui/icons-material/Search';

function SearchUsers() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const { searchUsers : results = [] } = useSelector(state => state.searchUsers);
  const {_id : userId} = useSelector(state =>state.user.user);

  useEffect(() => {
    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch]);

  useEffect(() => {
    if (query.trim()) {
      const delayDebounce = setTimeout(() => {
        dispatch(searchUserAction(query));
      }, 300); // debounce
      return () => clearTimeout(delayDebounce);
    }
  }, [query, dispatch]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white h-screen overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Search</h2>

      {/* Search Input */}
      <div className="flex w-full px-4 py-2 mb-4 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
        <SearchIcon />
        <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search users"
            className='w-full ml-2 border-gray-300 focus:outline-none'
        />
      </div>

      {/* Results */}
      {results?.length > 0 ? (
        <ul className="space-y-4">
          {results.map(user => (
            <Link
              to={`/user/${userId !== user?._id ? user?._id : 'me'}`}
              key={user._id}
              className="flex items-center gap-3 hover:bg-gray-100 px-2 py-2 rounded-lg transition"
            >
              <img
                src={user?.avatar?.url || 'https://i.pravatar.cc/300'}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-sm font-semibold">
                  {user.username}
                </div>
                <p className="text-gray-500 text-sm truncate w-[16rem]">
                  {user.name} {user?.followInfo && `• ${user?.followInfo}`}
                </p>
              </div>
            </Link>
          ))}
        </ul>
      ) : query ? (
        <p className="text-gray-500 text-sm mt-4">No users found.</p>
      ) : null}
    </div>
  );
}

export default SearchUsers;
