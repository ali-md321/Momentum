import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPasswordAction } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import BackdropLoader from '../Layouts/BackdropLoader';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { isLoading } = useSelector((state) => state.forgotPassword);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.warn("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    const result = await dispatch(resetPasswordAction(params.token, newPassword));
    if(result.success){
        toast.success("Password reset!..");
        navigate("/login");
    }
    else{
        toast.error(result.error);
    }
  };

  return (
    <>
      {isLoading && <BackdropLoader />}

      <div className="max-w-sm mx-auto mt-12 bg-white border border-gray-300 rounded-md shadow-sm">
        <div className="p-8 flex flex-col items-center gap-4">
          <img
            className="h-12 object-contain"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="Instagram Logo"
          />

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-4">
            {/* New Password */}
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': '#00b4d8' }} // pacific_cyan
              required
            />

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': '#00b4d8' }}
              required
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 rounded-md text-white font-medium transition"
              style={{ backgroundColor: '#03045e' }}
            >
              Submit
            </button>

            <div className="flex items-center gap-2">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="text-sm text-gray-500">OR</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>

            <Link to="/password/forgot" className="text-sm font-medium" style={{ color: '#0077b6' }}>
              Forgot password?
            </Link>
          </form>
        </div>
      </div>

      <div className="max-w-sm mx-auto mt-3 bg-white border border-t-0 border-gray-300 text-center text-sm py-4 rounded-b-md">
        <span>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold hover:underline" style={{ color: '#03045e' }}>
            Log in
          </Link>
        </span>
      </div>
    </>
  );
};

export default ResetPassword;
