import React from 'react';
import { Link } from 'react-router-dom';
import SignUp from './components/Signup';

function Landing() {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-green-500">RideSharing Platform</h1>
        <p className="text-lg mb-8">Your trusted ride-sharing service</p>
        <div className="flex justify-center space-x-4">
          <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300">
            User Login
          </Link>
          <Link to="/signUp" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300">
            User Signup
          </Link>
        </div>
        <div className="mt-8">
          <p className="text-gray-500">Are you an admin?</p>
          <Link to="/login" className="text-green-500 hover:underline transition duration-300">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
