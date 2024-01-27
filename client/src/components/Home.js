// src/Home.js
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import AvailableRides from './AvailableRides';
import PreviousRides from './Previous_Rides';
import Feedbacks from './Feedback'; 
import CreateRide from './createRide';

function Home() {
  // Dummy ride data for illustration
  const [rides, setRides] = useState([]);
  const [view, setView] = useState('available'); // State for tracking the view

  const [cookies, setCookie, removeCookie] = useCookies(['jwtoken']);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout clicked');
    removeCookie('jwtoken'); 
    navigate('/'); 
  };

  const handleHome = () => {
    console.log('Home clicked');
    setView('available'); // Switch to available rides view
  };

  const handlePreviousRides = () => {
    // Your logic to navigate to the previous rides page
    console.log('Previous Rides clicked');
    setView('previous'); // Switch to previous rides view
  };

    const handleCreateRide = () => {
      console.log('Create Ride clicked');
        setView('createRide'); 
    };
  const handleFeedbacks = () => {
    // Your logic to navigate to the feedbacks page
    console.log('Feedbacks clicked');
    setView('feedbacks'); // Switch to feedbacks view
  };


  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Left side: User Data */}
      <div className="w-1/5 p-4 border-r flex flex-col border-gray-600">
        {/* Display user data here */}
        <h2 className="text-xl font-bold ml-14 mb-2">User Profile</h2>
        {/* Add user details like name, email, etc. */}
        {/* Add buttons for user actions */}
        <button
          className={`bg-${view === 'available' ? 'blue' : 'green'}-500 hover:bg-${view === 'available' ? 'blue' : 'green'}-600 text-white py-2 px-4 rounded mb-2`}
          onClick={handleHome}
        >
          Home
        </button>
        <button
          className={`bg-${view === 'previous' ? 'blue' : 'green'}-500 hover:bg-${view === 'previous' ? 'blue' : 'green'}-600 text-white py-2 px-4 rounded mb-2`}
          onClick={handlePreviousRides}
        >
          My Rides
        </button>
        <button
          className={`bg-${view === 'feedbacks' ? 'blue' : 'green'}-500 hover:bg-${view === 'feedbacks' ? 'blue' : 'green'}-600 text-white py-2 px-4 rounded mb-2`}
          onClick={handleFeedbacks}
        >
          Feedbacks
        </button>
        <button
          className={`bg-${view === 'createRide' ? 'blue' : 'green'}-500 hover:bg-${view === 'createRide' ? 'blue' : 'green'}-600 text-white py-2 px-4 rounded mb-2`}
          onClick={handleCreateRide}
        >
          Create Ride
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Right side: Available Rides, Previous Rides, or Feedbacks based on the view */}
      <div className="w-3/4 p-4">
        {/* Render either AvailableRides, PreviousRides, or Feedbacks based on the view */}
        {view === 'available' ? <AvailableRides /> : null}
        {view === 'previous' ? <PreviousRides /> : null}
        {view === 'feedbacks' ? <Feedbacks /> : null}
        {view === 'createRide' ? <CreateRide /> : null}
      </div>
    </div>
  );
}

export default Home;
