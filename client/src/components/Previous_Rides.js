// src/PreviousRides.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PreviousRides() {
  // State for storing previous rides
  const [previousRides, setPreviousRides] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Filter rides from the rides array according to the start location that is the search term
    const filteredRides = previousRides.filter((ride) => ride.startlocation === searchTerm);
    setPreviousRides(filteredRides);
  };

  useEffect( () => {
    const fetchData = async () => {
    try {
      // Fetch previous ride data from the backend API
      const response = await axios.get('http://localhost:4000/trip/previous');
      setPreviousRides(response.data.previousTripsData);
    } catch (error) {
      console.error('Error fetching previous ride data:', error);
    }
  }
  fetchData();
  }, [previousRides]);

  return (
    <>
    <div >
       {/* Search Bar */}
       <div className="flex mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-600 text-black rounded-l w-3/4"
            placeholder="Search by Start Location"
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-r"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      <h2 className="text-2xl font-bold mb-4">Previous Rides</h2>
      {previousRides.length === 0 ? (
        <p className="text-gray-400">No previous rides available</p>
      ) : (
        previousRides.map((ride) => (
          <div key={ride._id} className="mb-4 border border-gray-600 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg font-semibold">Ride to Destination {ride.endlocation}</p>
              <span className={`px-2 py-1 rounded ${ride.status === 'Completed' ? 'bg-green-500' : 'bg-red-500'}`}>
                {ride.status}
              </span>
            </div>
            <p>Driver name: {ride.driverName}</p>
            <p>Price: {ride.price}</p>
            <p>Companions: {ride.numberofCompanions}</p>
            <p>Starts at: {ride.startTime}</p>
            <p>From: {ride.startlocation}</p>
            <p>To: {ride.endlocation}</p>
          </div>
        ))
      )}

       
    </div>
    </>
  );
}

export default PreviousRides;
