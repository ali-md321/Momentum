import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { deletePostAction, singlePostAction } from '../../actions/postAction';
import PostContainer from './PostContainer';
import SpinLoader from '../Layouts/SpinLoader';

function SinglePostDisplay() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user : currUser} = useSelector(state => state.user);
  const { singlePost : post } = useSelector(state => state.singlePost);

  useEffect(() => {
    if (id) {
      dispatch(singlePostAction(id));
    }
  }, [dispatch, id]);
  const handleDelete = async () => {
    await dispatch(deletePostAction(id));
    navigate('/user/me');
  }
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-xl min-h-screen">
      {/* Back to Profile Button */}
      <button
        onClick={() => {
            navigate(`/user/${currUser?._id != post?.postedBy?._id 
                              ? post?.postedBy?._id 
                              : "me"}`)
          }
        } 
        className="mb-6 text-blue-600 hover:underline font-medium"
      >
        ← Back to Profile
      </button>

      {/* Post Display */}
      {post ? (
        <>
        <PostContainer post={post} />
          { currUser?._id == post?.postedBy?._id &&
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" 
              onClick={handleDelete}>
              Delete Post
            </button>
          }
        </>
      ) : (
        <SpinLoader />
      )}
    </div>
  );
}

export default SinglePostDisplay;
