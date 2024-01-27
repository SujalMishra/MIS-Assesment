import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-phone-number-input/style.css';
import { useUser } from '../UserContext';


function PreviousRides() {
  // State for storing previous rides
  const [previousRides, setPreviousRides] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useUser();

  const [feedbackForm, setFeedbackForm] = useState({
    mail: '',
    feedbackText: '',
  });

  const handleChange = (e) => {
    if (e.target.name === "feedbackText") {
      setFeedbackForm({
        ...feedbackForm,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    // Your logic to handle feedback submission
    console.log(feedbackForm.mail + ' ' + 1+feedbackForm.feedbackText)
    try {
      const response = await axios.post('http://localhost:4000/feedback', {
        'to': feedbackForm.mail,
        'from': user.email,
        'review': feedbackForm.feedbackText, 
      });

      console.log('Feedback submitted:', response.data);
      setFeedbackForm({
        mail: '',
        feedbackText: '',
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleSearch = () => {
    // Filter rides from the rides array according to the start location that is the search term
    const filteredRides = previousRides.filter((ride) => ride.startlocation === searchTerm);
    setPreviousRides(filteredRides);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let id = user.userId;
        let email = user.email;
        const response = await axios.post(`http://localhost:4000/user/trips/${id}`, { email: email });
        console.log(response.data);
        setPreviousRides(response.data.trips);
      } catch (error) {
        console.error('Error fetching previous ride data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
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
        <h2 className="text-2xl font-bold mb-4">My Rides</h2>
        {previousRides.length === 0 ? (
          <p className="text-gray-400">No rides available</p>
        ) : (
          previousRides.map((ride) => (
            <div key={ride._id} className="mb-4 border border-gray-600 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg font-semibold">Ride to Destination {ride.endlocation}</p>
                <span
                  className={`px-2 py-1 rounded ${ride.status === 'Completed' ? 'bg-blue-500' : 'bg-red-500'}`}
                >
                  {ride.status}
                </span>
              </div>
              <p>Ride Id: {ride._id}</p>
              <p>Driver name: {ride.driverName}</p>
              <p>Driver mail: {ride.driverMail}</p>
              <p>Companions: {ride.numberofCompanions}</p>
              <p>Starts at: {ride.startTime}</p>
              <p>From: {ride.startlocation}</p>
              <p>Destination: {ride.endlocation}</p>
              {user.email != ride.driverMail && ( 
                <form onSubmit={handleSubmitFeedback} className="mt-4">
                Give feedback to: {feedbackForm.mail = ride.driverMail}
                  <textarea
                    name="feedbackText"
                    value={feedbackForm.feedbackText}
                    onChange={handleChange}
                    placeholder="Write your feedback..."
                    className="w-full p-2 border text-black border-gray-400 rounded"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-2"
                  >
                    Submit Feedback
                  </button>
                </form>
              )}
            </div>
          ))
        )}

            </div>
          
    </>
  );
}

export default PreviousRides;
