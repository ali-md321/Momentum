import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUserAction } from '../../actions/userAction';

function FollowButton({ targetUserId, className = "", onFollowToggle }) {
  const dispatch = useDispatch();
  const { user: currUser } = useSelector(state => state.user);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const followingIds = currUser?.following?.map(f =>
      typeof f === 'object' ? f._id : f
    ) || [];
    setIsFollowing(followingIds.includes(targetUserId));
  }, [currUser?.following, targetUserId]);

  const handleFollowToggle = async () => {
    await dispatch(followUserAction(targetUserId));
    setIsFollowing(prev => !prev); // ✅ immediately reflect follow state
    if (onFollowToggle) onFollowToggle(); // notify parent (e.g., to update UI)
  };
  

  if (!currUser || currUser._id === targetUserId) return null;

  return (
    <button
      className={`px-4 py-1 text-sm rounded-lg font-medium transition ${
        isFollowing
          ? 'bg-gray-300 text-black hover:bg-gray-400'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      } ${className}`}
      onClick={handleFollowToggle}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}

export default FollowButton;
