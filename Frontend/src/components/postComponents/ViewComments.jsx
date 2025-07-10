import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentAction } from '../../actions/postAction';

function ViewComments({ post, comments, setComments, onClose }) {
  const dispatch = useDispatch();
  const { user: currUser } = useSelector(state => state.user);
  const [comment, setComment] = useState('');

  const handleAddComment = async () => {
    if (comment.trim()) {
      const { comment: newComment } = await dispatch(addCommentAction(comment, post._id));

      if (newComment) {
        setComments(prev => [
          ...prev,
          {
            comment: newComment,
            user: currUser,
          },
        ]);
        setComment('');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-[900px] h-[600px] rounded-xl overflow-hidden flex flex-col md:flex-row shadow-lg relative">

        <button
          className="absolute top-4 right-4 z-10 text-gray-700 hover:text-black"
          onClick={onClose}
        >
          <CloseIcon />
        </button>

        {/* Left: Post Image (hidden on mobile) */}
        <div className="hidden md:block md:w-1/2 h-full bg-black">
          <img
            src={post?.image?.url}
            alt="post"
            className="object-contain w-full h-full"
          />
        </div>

        {/* Right: Comments Section */}
        <div className="w-full md:w-1/2 h-full flex flex-col">
          {/* Post Owner Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b">
            <Link
              to={`/user/${currUser?._id !== post?.postedBy?._id ? post?.postedBy?._id : 'me'}`}
              className="flex"
            >
              <img
                src={post?.postedBy?.avatar?.url || 'https://i.pravatar.cc/300'}
                alt="user"
                className="w-10 h-10 rounded-full object-cover border"
              />
              <p className="font-medium text-sm pl-2 pt-2">@{post?.postedBy?.username}</p>
            </Link>
            <div>
              <p>{post?.caption}</p>
            </div>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto px-4 space-y-4 py-2 text-sm">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <img
                    src={comment.user?.avatar?.url || 'https://i.pravatar.cc/100'}
                    alt="user"
                    className="w-8 h-8 rounded-full object-cover border"
                  />
                  <div>
                    <p>
                      <span className="font-semibold">@{comment.user?.username}</span>{' '}
                      {comment.comment}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Just now</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-4">No Comments currently!!</p>
            )}
          </div>

          {/* Add Comment */}
          <div className="border-t px-4 py-2 flex items-center gap-2">
            <input
              value={comment}
              type="text"
              placeholder="Add a comment..."
              className="flex-1 text-sm focus:outline-none text-black"
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="text-blue-500 text-sm font-medium hover:opacity-80"
              onClick={handleAddComment}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewComments;
