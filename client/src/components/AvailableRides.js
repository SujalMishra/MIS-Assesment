import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext';




function AvailableRides() {
    const [searchTerm, setSearchTerm] = useState('');
    const [rides, setRides] = useState([]);
    const {user} = useUser();

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/trip/available');
        console.log(response);
        setRides(response.data.tripsData);
      } catch (error) {
        console.log("db error" + error);
      }
    };
  
    useEffect(() => {
        fetchData(); 
      }, []);
      
    const handleBooking = async (id) => {
        console.log('Book Now clicked');
        
        try {
            let _email = user.email;
            const res = await axios.post(`http://localhost:4000/book/${id}`,
             {email: _email} 
            );
            console.log(res);
        }
        catch (error) {
            console.log("db error" + error);
        }
    }
     
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
            className="p-2 border border-gray-600 text-black rounded-l w-5/6"
            placeholder="Search by Start Location"
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white ml-4 w-64 py-2 px-4 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
       
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
            <p>Ride Id: {ride._id}</p>
            <p>Driver name: {ride.driverName}</p>
            {/* <p>Price: {ride.price}</p> */}
            <p>Companions: {ride.numberofCompanions}</p>
            <p>Starts at: {new Date(ride.startTime).toLocaleString()}</p>
            <p>From: {ride.startlocation}</p>
            <p>To: {ride.endlocation}</p>
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={() =>handleBooking(ride._id)}>
                Book Now
            </button>
            </div>
        ))
)}

        </div>
  )
}

export default AvailableRides