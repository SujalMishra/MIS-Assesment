import React from 'react'

import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUp from './components/Signup';

function landing() {

  return (
    <div className="bg-black">
       <> 
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">RideSharing Platform</h1>
        <p className="mb-8">Your trusted ride-sharing service</p>
        <div className="flex justify-center space-x-4">
            <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            User Login
            </Link>
            <Link to="/signUp" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" >
            User Signup
            </Link>
        </div>
        <div className="mt-8">
            <p className="text-gray-500">Are you an admin?</p>
            <button className="text-green-500 hover:underline">Admin Login</button>
        </div>
        </div>
        </div>
        </>
  </div>
  )
}

export default landing