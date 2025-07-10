import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, editUserAction } from "../../actions/userAction";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});
  const [clientErrors, setClientErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
        avatar: null,
        preview: user.avatar?.url || null,
        prevFilename: user.avatar?.filename || "",
      });
    }
  }, [user]);

  useEffect(() => {
    return () => dispatch(clearErrors());
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files?.[0]) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        avatar: file,
        preview: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name?.trim()) errs.name = "Name is required";
    if (!formData.username?.trim()) errs.username = "Username is required";
    if (!formData.email?.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Invalid email format";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setClientErrors(validationErrors);
      return;
    }

    let dataToSubmit;
    if (formData.avatar) {
      dataToSubmit = new FormData();
      dataToSubmit.append("name", formData.name);
      dataToSubmit.append("username", formData.username);
      dataToSubmit.append("email", formData.email);
      dataToSubmit.append("bio", formData.bio || "");
      dataToSubmit.append("avatar", formData.avatar);
      dataToSubmit.append("prevFilename", formData.prevFilename || "");
    } else {
      dataToSubmit = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        bio: formData.bio || "",
        prevFilename: formData.prevFilename || ""
      };
    }

    const res = await dispatch(editUserAction(dataToSubmit));

    if (res?.success) {
      toast.success("Profile updated successfully ✅");
      navigate("/user/me");
    } else if (res?.error) {
      toast.error(res.error);
    }
  };

  if (!user) return <div className="text-center mt-10">Loading user data...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-federal_blue-600 text-center mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Avatar */}
        <div className="flex flex-col items-center space-y-3">
          <label htmlFor="avatar" className="cursor-pointer">
            <img
              src={formData.preview || "https://i.pravatar.cc/150"}
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-pacific_cyan-500"
            />
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className={`w-full mt-1 px-4 py-2 text-sm border ${
              clientErrors?.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue_green-500`}
          />
          {clientErrors?.name && (
            <p className="text-xs text-red-500 mt-1">{clientErrors.name}</p>
          )}
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
            className={`w-full mt-1 px-4 py-2 text-sm border ${
              clientErrors?.username ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-honolulu_blue-500`}
          />
          {clientErrors?.username && (
            <p className="text-xs text-red-500 mt-1">{clientErrors.username}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className={`w-full mt-1 px-4 py-2 text-sm border ${
              clientErrors?.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-marian_blue-500`}
          />
          {clientErrors?.email && (
            <p className="text-xs text-red-500 mt-1">{clientErrors.email}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio || ""}
            onChange={handleChange}
            rows={3}
            className="w-full mt-1 px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-non_photo_blue-400 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 rounded-md bg-blue-300 text-black font-semibold hover:bg-blue-500"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
