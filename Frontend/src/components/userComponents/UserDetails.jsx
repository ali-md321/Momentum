import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GridOnIcon from '@mui/icons-material/GridOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link, useParams } from 'react-router-dom';
import {showUserDetailsAction } from "../../actions/userAction"
import FollowButton from '../activityComponents/FollowButton';
import ShowActivityUsers from './ShowActivityUsers';
import { useNavigate } from 'react-router-dom';
import { accessChat } from '../../actions/chatAction'; // ✅ make sure this exists

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: currUser = {} } = useSelector(state => state.user);
  const { userDetails } = useSelector(state => state.userDetails);
  const { posts = [],saved = [] } = userDetails;
  const [showFollowersModal,setShowFollowersModal] = useState(false);
  const [showFollowingModal,setShowFollowingModal] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    dispatch(showUserDetailsAction(id));
  }, [dispatch, id]);

  const handleMessageClick = async () => {
    const chat = await dispatch(accessChat(userDetails._id));
    if (chat?._id) {
      navigate(`/direct`);
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen relative">
      {showFollowingModal && (
        <ShowActivityUsers users={userDetails.following} type="Following" onClose={() => setShowFollowingModal(false)} />
      )}
      {showFollowersModal && (
        <ShowActivityUsers users={userDetails.followers} type="Followers" onClose={() => setShowFollowersModal(false)} />
      )}

      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="lg:px-10 flex flex-col md:flex-row items-center md:items-start gap-10 border-b pb-8">
          <div className="w-36 h-36 rounded-full bg-gray-300 overflow-hidden">
            <img
              src={userDetails?.avatar?.url || "https://i.pravatar.cc/300"}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:px-10 flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h2 className="text-2xl font-semibold">@{userDetails?.username}</h2>
              {currUser?._id === userDetails?._id ? (
                <Link className="border px-4 py-1 rounded-md text-sm font-medium hover:bg-gray-100"
                      to="/user/me/edit"
                >
                  Edit profile
                </Link>
              ) : (
                <div className="flex gap-4">
                  <FollowButton
                    key={userDetails._id}
                    targetUserId={userDetails._id}
                    onFollowToggle={() => dispatch(showUserDetailsAction(id))}
                  />
                  <Link className="px-4 py-1 rounded-lg border text-blue-600 hover:bg-blue-50 font-medium transition"
                      onClick={handleMessageClick}
                  >
                    Message
                  </Link>
                </div>
              )}
            </div>
            <div className="flex gap-6 mt-4">
              <p><span className="font-semibold">{posts?.length}</span> posts</p>
              <Link onClick={() => setShowFollowersModal(true)}><p><span className="font-semibold">{userDetails?.followers?.length || 0}</span> followers</p></Link>
              <Link onClick={() => setShowFollowingModal(true)}><p><span className="font-semibold">{userDetails?.following?.length || 0}</span> following</p></Link>
            </div>

            <div className="mt-4">
              <p className="font-semibold">{userDetails?.name}</p>
              <p className="text-sm">{userDetails?.bio}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-10 py-4 border-b text-sm font-semibold text-gray-500">
          <button onClick={() => setActiveTab("posts")} className={`flex items-center gap-1 ${activeTab === "posts" ? "text-black border-t-2 border-black" : ""}`}>
            <GridOnIcon fontSize="small" /> POSTS
          </button>
          <button onClick={() => setActiveTab("saved")} className={`flex items-center gap-1 ${activeTab === "saved" ? "text-black border-t-2 border-black" : ""}`}>
            <BookmarkBorderIcon fontSize="small" /> SAVED
          </button>
          <button onClick={() => setActiveTab("tagged")} className={`flex items-center gap-1 ${activeTab === "tagged" ? "text-black border-t-2 border-black" : ""}`}>
            <PermIdentityIcon fontSize="small" /> TAGGED
          </button>
        </div>

        {/* Posts Grid */}
        {activeTab == "posts" && (
          posts.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 mt-6">
              {posts.map(post => (
                <Link to={`/post/${post._id}`} key={post._id}>
                  <div className="aspect-square bg-gray-100 overflow-hidden hover:opacity-80 cursor-pointer">
                    {post?.image?.url ? (
                      <img src={post.image.url} alt="post" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                  </div>
                </Link>
              ))}
              </div>
            ) : (
            <p className="text-center mt-10 text-gray-500">No posts created by @{userDetails?.username}</p>
            )
          ) 
        }

        {/* Saved Grid */}
        {activeTab === "saved" && (
          saved.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 mt-6">
              {saved.map(save => (
                <Link to={`/post/${save._id}`} key={save._id}>
                  <div className="aspect-square bg-gray-100 overflow-hidden hover:opacity-80 cursor-pointer">
                    {save?.image?.url ? (
                      <img src={save.image.url} alt="savedPost" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                  </div>
                </Link>
              ))}
              </div>
            ) : (
            <p className="text-center mt-10 text-gray-500">No saved posts by @{userDetails?.username}</p>
            )
          ) 
        }

        {/* Tagged Grid*/}
        { activeTab == "tagged" && 
          (
            <div className="text-center text-gray-400 py-20">
              <p>Nothing to show here yet.</p>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default UserDetails;
