import { Route, Routes } from "react-router-dom";
import SignUp from "./components/userComponents/SignUp";
import Login from "./components/userComponents/Login";
import Description from "./components/Description";
import "./App.css";
import Navbar from "./components/Bars/Navbar";
import { useDispatch, useSelector } from 'react-redux';
import AllPosts from "./components/postComponents/AllPosts";
import CreatePost from "./components/postComponents/CreatePost";
import Sidebar from "./components/Bars/SideBar";
import SinglePostDisplay from "./components/postComponents/SinglePostDisplay";
import { useEffect, useState } from "react";
import { loadUserAction } from "./actions/userAction";
import SpinLoader from "./components/Layouts/SpinLoader";
import UserDetails from "./components/userComponents/UserDetails";
import SearchUsers from "./components/userComponents/SearchUsers";
import Error from "./components/Error";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatPage from "./components/chatComponents/ChatPage";
import EditUser from "./components/userComponents/EditUser";
import ForgotPassword from "./components/userComponents/ForgotPassword";
import ResetPassword from "./components/userComponents/ResetPassword";

function App() {
  const [appLoading, setAppLoading] = useState(true); 
  const { isAuthenticated,isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadUser() {
      await dispatch(loadUserAction());
      setAppLoading(false); 
    }
    loadUser();
  }, [dispatch]);

  if (appLoading) {
    return <SpinLoader />;
  }
  
  return (
    <>
      <Navbar />
      <ToastContainer position="bottom-right" autoClose={3000} />
      {isAuthenticated ? 
        (isLoading ? <SpinLoader /> :(
        <div className="flex h-[calc(100vh-64px)]">
          <Sidebar />
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<AllPosts />} />
              <Route path="/posts/new" element={<CreatePost />} />
              <Route path="/user/:id" element={<UserDetails />} />
              <Route path="/user/me/edit" element={<EditUser />} />
              <Route path="/post/:id" element={<SinglePostDisplay />} />
              <Route path="/search" element={<SearchUsers />} />
              <Route path="/direct" element={<ChatPage />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </div>
        )
      ) : (
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="*" element={<Description />} />
        </Routes>
      )}
    </>
  );
}

export default App;
