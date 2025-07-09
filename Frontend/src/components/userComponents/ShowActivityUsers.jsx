import React from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import FollowButton from '../activityComponents/FollowButton';
import { useSelector } from 'react-redux';

function ShowActivityUsers({ users = [], onClose, type = "" }) {
  const {_id : userId} = useSelector(state => state.user.user);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] max-h-[80vh] rounded-xl overflow-hidden flex flex-col shadow-lg">
        {/* Header */}
        <div className="relative p-4 border-b flex items-center justify-center">
          <h2 className="text-lg font-bold">{type == "Likes" ? "Liked By" : type}</h2>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable list */}
        <div className="overflow-y-auto px-4 py-2 flex-1 space-y-3">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="flex items-center justify-between">
                <Link to={`/user/${userId !== user?._id ? user?._id : 'me'}`} 
                      className="flex items-center gap-3 hover:bg-gray-50 px-1 py-1 rounded"
                      onClick={onClose}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar?.url || 'https://i.pravatar.cc/300'}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-semibold text-sm">{user.username}</p>
                      <p className="text-xs text-gray-500">{user.name}</p>
                    </div>
                  </div>
                </Link>
                <FollowButton  targetUserId={user._id} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">No {type == "Likes" ? "liked Users" : type} currently!!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowActivityUsers;
