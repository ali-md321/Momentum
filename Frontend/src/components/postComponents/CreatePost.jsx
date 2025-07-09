import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction } from '../../actions/postAction'; // Uncomment and use your actual action
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const [post, setPost] = useState({
    caption: '',
    image: null,
    preview: null
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", post.caption);
    formData.append("image", post.image);
    formData.append("userId",user?._id);
    try {
      const { success, message } = await dispatch(createPostAction(formData));
  
      if (success) {
        toast.success(message || "Post uploaded successfully ✅");
        setPost({ caption: '', image: null, preview: null });
        navigate("/user/me");
      } else {
        toast.error(message || "Failed to upload post.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An unexpected error occurred ❌");
    }  
    
  };

  const inputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        setPost(prev => ({
          ...prev,
          image: file,
          preview: URL.createObjectURL(file),
        }));
      }
    } else {
      setPost(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#caf0f8] via-[#ade8f4] to-[#48cae4] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-[#03045e]">

        <h2 className="text-3xl font-bold text-center mb-6 text-[#0077b6]">Create a Post</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Caption */}
          <input
            type="text"
            name="caption"
            value={post.caption}
            onChange={inputChange}
            placeholder="Write a caption..."
            className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-sky-300 shadow-inner"
          />

          {/* Image Upload */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={inputChange}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-[#00b4d8] file:text-white
              hover:file:bg-[#0077b6] transition"
          />

          {/* Preview */}
          {post.preview && (
            <img
              src={post.preview}
              alt="Preview"
              className="w-full h-auto max-h-60 rounded-xl object-cover shadow-lg"
            />
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] hover:from-[#48cae4] hover:to-[#023e8a] text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg"
          >
            Upload Post
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default CreatePost;
