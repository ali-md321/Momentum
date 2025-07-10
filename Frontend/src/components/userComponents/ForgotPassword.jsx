import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { clearErrors, forgotPasswordAction } from '../../actions/userAction';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import BackdropLoader from '../Layouts/BackdropLoader';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { error, message, isLoading } = useSelector((state) => state.forgotPassword);

  const [email, setEmail] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    await dispatch(forgotPasswordAction(email));
    setEmail("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <>
      {isLoading && <BackdropLoader />}

      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full space-y-6">
          <div className="bg-white border border-gray-300 p-8 rounded-md shadow-sm">
            <div className="flex justify-center mb-6">
              <img
                draggable="false"
                className="h-14"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Instagram Logo"
              />
            </div>

            <h2 className="text-center text-lg font-medium text-gray-800 mb-2">Reset your password</h2>
            <p className="text-sm text-center text-gray-500 mb-5">Enter your email address and we’ll send you a link to reset your password.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <TextField
                label="Email Address"
                variant="outlined"
                size="small"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button
                type="submit"
                className="bg-blue-500 mt-2 hover:bg-blue-600 text-white w-full py-2 rounded font-medium transition"
              >
                Send Reset Link
              </button>
            </form>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="px-2 text-gray-400 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>

            <div className="text-center">
              <Link to="/login" className="text-sm text-blue-700 font-medium hover:underline">
                Back to Login
              </Link>
            </div>
          </div>

          <div className="bg-white border border-gray-300 p-4 text-center text-sm rounded-md">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
