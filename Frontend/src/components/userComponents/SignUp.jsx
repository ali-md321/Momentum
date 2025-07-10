import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUserAction } from '../../actions/userAction';
import { Link, useNavigate } from 'react-router-dom';
import momentumLogo from '../../assets/Momentum_Logo.png';
import { toast } from 'react-toastify';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '', username: '', email: '', password: '',avatar : null,preview : null,bio : ''
  });

  const [message, setMessage] = useState('');

  const { error } = useSelector(state => state.user);

  useEffect(() => {
    if (error) {
      setMessage(error);
      toast.error(error);
    }
  }, [error]);
  
  useEffect(() => {
    return () => {
      dispatch(clearErrors());
      setMessage('');
    };
  }, []);
  


  const submitHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("username", user.username);
    formData.append("password", user.password);
    formData.append("email", user.email);
    formData.append("avatar", user.avatar);
    formData.append("bio", user.bio);
  
    const { success } = await dispatch(registerUserAction(formData));
    if (success) {
      setUser({name: '',username: '',email: '',password: '',avatar: null,bio: '',preview: null});
      setMessage("");
      toast.success(`Welcome, ${user.username}!`);
      navigate("/");
    }    
  };
  

  const changeHandler = (e) => {
    const { name, value, files } = e.target;
    if(name === "avatar" && files && files[0]){
      const file = files[0];
      if (file) {
        setUser(prev => ({
          ...prev,
          avatar: file,
          preview: URL.createObjectURL(file),
        }));
      }
    }else{
      setUser(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ade8f4] via-[#48cae4] to-[#0077b6] px-4 py-8">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10 text-white">
        
        {/* Logo */}
        <div className="mb-8 text-center">
          <img src={momentumLogo} alt="Momentum" className="h-16 mx-auto mb-4 brightness-125 drop-shadow-lg" />
          <h1 className="text-4xl font-bold tracking-wide">Join <span className="text-white/90">Momentum</span></h1>
          <p className="text-white/80 text-sm mt-1">Start sharing your moments with the world</p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={changeHandler}
            placeholder="Name"
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-[#48cae4] shadow-inner"
          />
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={changeHandler}
            placeholder="Username"
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-[#48cae4] shadow-inner"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={changeHandler}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-[#48cae4] shadow-inner"
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={changeHandler}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-[#48cae4] shadow-inner"
          />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={changeHandler}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-[#00b4d8] file:text-white
              hover:file:bg-[#0077b6] transition"
          />
          {user.preview && (
            <img
              src={user.preview}
              alt="Preview"
              className="w-full h-auto max-h-60 rounded-xl object-cover shadow-lg"
            />
          )}
          <input
            type="bio"
            name="bio"
            value={user.bio}
            onChange={changeHandler}
            placeholder="Bio"
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-[#48cae4] shadow-inner"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#00b4d8] to-[#023e8a] hover:from-[#0077b6] hover:to-[#03045e] text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg"
          >
            Sign Up
          </button>
          {message && <p className="text-red-300 text-md font-bold text-center">{message}</p>}
        </form>

        {/* Bottom Link */}
        <div className="mt-6 text-center text-sm text-white/80">
          Already have an account?{' '}
          <Link to="/login" className="text-white font-semibold underline hover:text-white/90">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
