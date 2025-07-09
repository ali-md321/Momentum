import React from 'react';
import "../../App.css";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUserAction } from '../../actions/userAction';

function Navbar() {
  const { isAuthenticated } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(logoutUserAction());
    navigate("/");
  };
  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-[#48cae4] to-[#caf0f8] shadow-md backdrop-blur-xl border-b border-white/20">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">

        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide text-white drop-shadow-md hover:text-black/50 transition-all duration-200">
          Momentum
        </Link>
        
        {/* Navigation Links Right */}
        <div className="flex items-center space-x-6 text-sm md:text-base font-medium">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="px-4 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 hover:text-black/90"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 hover:text-black/90"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 hover:text-black/90"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
