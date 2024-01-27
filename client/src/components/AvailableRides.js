import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';




function AvailableRides() {
    const [searchTerm, setSearchTerm] = useState('');
    const [rides, setRides] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:4000/gettrips');
            console.log(response);
            setRides(response.data.tripsData);
          } catch (error) {
            console.log("db error" + error);
          }
        };
      
        fetchData(); 
      }, []);
      

    const handleSearch = () => {
        const filteredRides = rides.filter((ride) => ride.startlocation === searchTerm);
        setRides(filteredRides);
      };
  return (
    <div>
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
        {/* Display available rides and booking options here */}
        <h2 className="text-2xl font-bold mb-4">Available Rides</h2>
                {rides.length === 0 ? (
        <p className="text-gray-400">No rides available</p>
        ) : (
        rides.map((ride) => (
            <div key={ride._id} className="mb-4 border border-gray-600 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <p className="text-lg font-semibold">Ride to Destination {ride.endlocation}</p>
                <span className={`px-2 py-1 rounded ${ride.status === 'Scheduled' ? 'bg-blue-500' : 'bg-green-500'}`}>
                {ride.status}
                </span>
            </div>
            <p>Driver name: {ride.driverName}</p>
            <p>Price: {ride.price}</p>
            <p>Companions: {ride.numberofCompanions}</p>
            <p>Starts at: {ride.startTime}</p>
            <p>From: {ride.startlocation}</p>
            <p>To: {ride.endlocation}</p>
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                Book Now
            </button>
            </div>
        ))
)}

        
        {/* Add more ride details as needed */}
    </div>
  )
}

export default AvailableRides
