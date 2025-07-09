import React, { useState } from 'react';
import {addCommentAction,likeUnlikeAction,saveTogglePostAction,} from '../../actions/postAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import SendIcon from '@mui/icons-material/Send';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import FollowButton from '../activityComponents/FollowButton';
import ViewComments from './ViewComments';
import ShowActivityUsers from '../userComponents/ShowActivityUsers';

function PostContainer({ post }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const userId = user?._id;

  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(post.likes || []);
  const [hasLiked, setHasLiked] = useState(post.likes?.some((p) => p._id === userId));
  const [hasSaved, setHasSaved] = useState(post.savedBy.includes(userId));
  const [comments, setComments] = useState(post.comments || []);

  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showLikedUserModal, setShowLikedUserModal] = useState(false);
  const [followChanged, setFollowChanged] = useState(false);

  const handleAddComment = async () => {
    if (comment.trim()) {
      const { comment: newComment } = await dispatch(addCommentAction(comment, post._id));
      setComment('');
      if (newComment) {
        setComments(prev => [...prev, { comment: newComment, user }]);
      }
    }
  };

  const toggleLike = async () => {
    dispatch(likeUnlikeAction(post._id));
    if (hasLiked) {
      setLikes(prev => prev.filter(p => p._id !== user._id));
    } else {
      setLikes(prev => [...prev, user]);
    }
    setHasLiked(!hasLiked);
  };

  const toggleSave = async () => {
    await dispatch(saveTogglePostAction(post._id));
    setHasSaved(prev => !prev);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {showCommentsModal && (
        <ViewComments
          post={post}
          comments={comments}
          setComments={setComments}
          onClose={() => setShowCommentsModal(false)}
        />
      )}

      {showLikedUserModal && (
        <ShowActivityUsers
          users={likes}
          type="Likes"
          onClose={() => setShowLikedUserModal(false)}
        />
      )}

      {/* Post header */}
      <div className="flex justify-between items-center">
        <Link to={`/user/${userId !== post?.postedBy?._id ? post?.postedBy?._id : 'me'}`}>
          <div className="flex items-center gap-3 p-3">
            <img
              src={post?.postedBy?.avatar?.url || 'https://i.pravatar.cc/300'}
              alt="user"
              className="w-9 h-9 rounded-full object-cover border"
            />
            <p className="font-medium text-sm">@{post?.postedBy?.username}</p>
          </div>
        </Link>

        {userId !== post?.postedBy?._id && (
          <FollowButton
            key={`${post.postedBy._id}-${user.following?.length}`} // 🔁 Rerender when list changes
            targetUserId={post.postedBy?._id}
            className="m-2 h-9"
            onFollowToggle={() => setFollowChanged((prev) => !prev)}
          />
          
        )}
      </div>

      {/* Post image */}
      <div className="w-full aspect-square bg-gray-100">
        <img
          src={post?.image?.url}
          alt={post?.caption}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Action icons */}
      <div className="flex items-center justify-between px-3 pt-2">
        <div className="flex items-center gap-5">
          <span onClick={toggleLike}>
            {hasLiked ? (
              <FavoriteOutlinedIcon fontSize="medium" className="cursor-pointer text-pink-500" />
            ) : (
              <FavoriteBorderIcon fontSize="medium" className="cursor-pointer text-gray-700" />
            )}
          </span>
          <ChatOutlinedIcon
            fontSize="medium"
            className="cursor-pointer"
            onClick={() => setShowCommentsModal(true)}
          />
          <SendIcon fontSize="medium" className="cursor-pointer" />
        </div>
        <span onClick={toggleSave}>
          {hasSaved ? (
            <BookmarkIcon fontSize="medium" className="cursor-pointer" />
          ) : (
            <BookmarkBorderIcon fontSize="medium" className="cursor-pointer" />
          )}
        </span>
      </div>

      {/* Likes */}
      <Link
        className="px-3 pt-2 text-sm font-semibold"
        onClick={() => setShowLikedUserModal(true)}
      >
        {likes.length} {likes.length === 1 ? 'like' : 'likes'}
      </Link>

      {/* Caption */}
      <div className="px-3 pt-1 text-sm">
        <Link to={`/user/${userId !== post?.postedBy?._id ? post?.postedBy?._id : 'me'}`}>
          <span className="font-semibold">{post?.postedBy?.username}</span>
        </Link>{' '}
        <span>
          {post?.caption?.slice(0, 40)}
          {post?.caption?.length > 40 && (
            <span className="text-gray-500">... more</span>
          )}
        </span>
      </div>

      {/* View all comments */}
      <div className="px-3 pt-1 pb-1 text-sm text-gray-400">
        <Link className="hover:underline" onClick={() => setShowCommentsModal(true)}>
          View all {comments.length} comments
        </Link>
      </div>

      {/* Add comment */}
      <div className="border-t h-15 px-3 py-2 flex items-center text-sm text-gray-500">
        <input
          type="text"
          name="comment"
          placeholder="Add a comment..."
          className="w-full focus:outline-none text-black"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="text-blue-500 text-sm font-medium hover:opacity-80"
          onClick={handleAddComment}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default PostContainer;
