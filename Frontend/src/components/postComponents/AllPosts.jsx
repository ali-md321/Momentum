import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homePostsAction } from '../../actions/postAction';
import SpinLoader from '../Layouts/SpinLoader';

import PostContainer from './PostContainer';

function AllPosts() {
  const dispatch = useDispatch();
  const { homePosts = [], isLoading } = useSelector(state => state.homePosts);
  const [shuffledPosts, setShuffledPosts] = useState([]);

  useEffect(() => {
    dispatch(homePostsAction());
  }, [dispatch]); 
  
  useEffect(() => {
    if (Array.isArray(homePosts) && homePosts.length > 0) {
      const shuffled = [...homePosts];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setShuffledPosts(shuffled);
    }
  }, [homePosts]);

  if (isLoading) return <SpinLoader />;

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      {shuffledPosts.map((post) => (
          <PostContainer post={post} key={post._id}/>
        )
      )}
  
      {!isLoading && shuffledPosts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No posts available.</p>
      )}
    </div>
  );  
}

export default AllPosts;
