import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage or cookies if needed
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-400 px-20 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-3">
        <img
          src="https://tasktracker.in/webassets/images/logoimages/tasktrackerlogo.webp"
          alt="Tracker Logo"
          className="h-8 w-auto" // Increased size for better visibility
        />
      </div>
      <button
        onClick={handleLogout}
        className="bg-[#dbd7d5] text-[#132579] px-4 py-2 rounded-md shadow-md hover:bg-blue-100 transition duration-300 font-bold"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;

