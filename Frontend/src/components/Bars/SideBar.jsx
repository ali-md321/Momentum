import React, { useEffect, useState } from "react";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Message as MessageIcon,
  AddBox as AddBoxIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "Search", icon: <SearchIcon />, path: "/search" },
    { name: "Messages", icon: <MessageIcon />, path: "/direct" },
    { name: "Create", icon: <AddBoxIcon />, path: "/posts/new" },
    { name: "Profile", icon: <AccountCircleIcon />, path: "/user/me" },
  ];

  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const checkCollapse = () => {
      const isMsgRoute = (location.pathname === "/direct" || location.pathname === `/direct`);
      const isBetween = window.innerWidth < 1000 && window.innerWidth >= 768;
      setIsCompact(isBetween || isMsgRoute);
    };

    checkCollapse();
    window.addEventListener("resize", checkCollapse);
    return () => window.removeEventListener("resize", checkCollapse);
  }, [location]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${isCompact ? 'w-16' : 'w-64'} h-[calc(100vh-64px)] sticky top-[64px] overflow-y-auto`}>
        <div className="flex flex-col justify-between h-full py-10 px-2">
          {/* Top Navigation */}
          <div className="flex-1 flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center text-gray-800 hover:text-blue-600 transition font-medium relative ${
                  isCompact ? 'justify-center' : 'gap-4 px-3'
                }`}
              >
                <div className="relative">
                  {item.icon}
                  {item.notification && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow">
                      {item.notification}
                    </span>
                  )}
                </div>
                {/* Only show text when expanded */}
                {!isCompact && <span>{item.name}</span>}
              </Link>
            ))}
          </div>

          {/* Bottom Avatar / Settings */}
          <div className={`mt-6 text-gray-600 hover:text-blue-500 transition flex items-center ${isCompact ? 'justify-center' : 'gap-3 px-3'}`}>
            <Link to="/user/me" className="flex justify-baseline"> 
              <img
                src= "https://i.pravatar.cc/300"
                alt="Profile"
                className="w-8 h-8 mr-5 rounded-full border"
              />
              {!isCompact && <span className="font-medium">You</span>}
            </Link>
          </div>
        </div>
      </aside>


      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-inner flex justify-around items-center px-4 py-2 md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="relative text-gray-700 hover:text-blue-500"
          >
            <div className="relative">
              {item.icon}
              {item.notification && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {item.notification}
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>
    </>
  );
}
