import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, LoginUserAction } from '../../actions/userAction';
import { useNavigate, Link } from 'react-router-dom';
import momentumLogo from '../../assets/Momentum_Logo.png';
import { toast } from 'react-toastify';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { error } = useSelector(state => state.user);

  useEffect(() => {
    if (error && hasSubmitted) {
      toast.error(error);
    }
  }, [error, hasSubmitted]);

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const { success } = await dispatch(LoginUserAction(user));
    if (success) {
      setUser({ email: '', password: '' });
      toast.success("Logged in!..");
      navigate("/");
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ade8f4] via-[#48cae4] to-[#0096c7] px-4 py-8">
      <div className="w-full max-w-sm backdrop-blur-lg bg-white/30 border border-white/20 shadow-2xl rounded-xl px-8 py-10">

        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src={momentumLogo}
            alt="Momentum"
            className="h-14 mx-auto mb-2 brightness-125 drop-shadow-lg"
          />
          <h1 className="text-3xl font-semibold text-white">Log in to Momentum</h1>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={changeHandler}
            placeholder="Username or Email"
            className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-[#90e0ef] shadow-inner"
            required
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={changeHandler}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-[#90e0ef] shadow-inner"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00b4d8] to-[#023e8a] text-white font-medium text-base hover:from-[#0096c7] hover:to-[#03045e] shadow-lg transition-all"
          >
            Log In
          </button>
        </form>

        {/* Forgot Password */}
        <div className="mt-4 text-center">
          <Link
            to="/password/forgot"
            className="text-sm text-white hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 my-4">
          <div className="flex-grow h-px bg-white/30" />
          <span className="text-sm text-white/70">OR</span>
          <div className="flex-grow h-px bg-white/30" />
        </div>

        {/* Signup Link */}
        <div className="text-center text-sm text-white/80">
          Don’t have an account?{' '}
          <Link
            to="/signup"
            className="text-white font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
