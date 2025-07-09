import React from 'react';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';
import HomeImage from "../assets/HomeImage.jpeg"; // ⬅️ Replace with your image path

function Description() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#caf0f8] via-[#ade8f4] to-[#48cae4] flex flex-col items-center justify-start px-4 py-12">
        
        {/* Hero Section */}
        <div className="max-w-6xl w-full flex flex-col-reverse md:flex-row items-center justify-between mb-20">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-[#023e8a] mb-4">
              Welcome to <span className="text-[#0077b6]">Momentum</span>
            </h1>
            <p className="text-[#03045e] text-lg mb-6">
              A full-featured social media experience built for modern connection. Post, share, like, and explore with ease. Momentum is where ideas move.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-[#00b4d8] to-[#0077b6] hover:from-[#48cae4] hover:to-[#023e8a] text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md transition"
            >
              Get Started
            </button>
          </div>

          <div className="md:w-1/2 mb-10 md:mb-0">
            <img
              src={HomeImage}
              alt="Social Media Hero"
              className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Feature Section */}
        <div className="bg-white/70 backdrop-blur-md shadow-2xl rounded-3xl p-10 max-w-4xl w-full text-center text-[#03045e]">
          <h2 className="text-3xl font-bold text-[#0077b6] mb-4">What’s Inside Momentum?</h2>
          <p className="text-gray-700 text-md mb-6">
            Momentum is built with the latest technology stack (MERN) and offers everything you expect from a social media platform.
          </p>
          <ul className="text-left text-gray-800 space-y-3 list-disc list-inside">
            <li>🔐 Secure Login & Signup with JWT Authentication</li>
            <li>🖼️ Upload, edit, and delete posts with images</li>
            <li>💬 Commenting & Liking for interactions</li>
            <li>👥 Follow / Unfollow users with profile views</li>
            <li>🔎 Explore users and hashtags with search</li>
            <li>⚡ Built using React, Node, Express, MongoDB, and Tailwind CSS</li>
          </ul>
          <p className="mt-6 text-sm text-gray-500 italic">
            Join Momentum and build your own space in the social universe.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-gradient-to-r from-[#0077b6] to-[#023e8a] text-white">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-2">Momentum</h3>
            <p className="text-sm text-blue-100">
              Momentum is your next-generation social platform. Designed for simplicity, built for connection.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-2">Contact Us</h3>
            <p className="text-sm text-blue-100">Email: support@momentumapp.com</p>
            <p className="text-sm text-blue-100">Phone: +91 98765 43210</p>
            <p className="text-sm text-blue-100">Address: IIT Palakkad, Kerala, India</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-2">Quick Links</h3>
            <ul className="text-sm text-blue-100 space-y-1">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/signup" className="hover:underline">Sign Up</Link></li>
              <li><Link href="/login" className="hover:underline">Login</Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-blue-200 text-sm py-4 border-t border-blue-600">
          © {new Date().getFullYear()} Momentum. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default Description;
