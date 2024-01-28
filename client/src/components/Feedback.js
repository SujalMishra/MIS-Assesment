// src/Feedbacks.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../UserContext';

function Feedbacks() {
  // State for feedback data
  const [feedbacks, setFeedbacks] = useState([]);
  const {user} = useUser();
  useEffect( () => {
    let id = user.userId;
    let mail = user.email;
    const fetchData = async () => {
      console.log(id + " " + mail);
      try {
        const response = await axios.post(`http://localhost:4000/user/feedback/${id}`, {email: mail});
        console.log(response.data.feedbacks);
        setFeedbacks(response.data.feedbacks);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Feedbacks</h2>
        {feedbacks.length === 0 ? (
          <p className="text-gray-400">No feedbacks available</p>
        ) : (
          feedbacks.map((feedback) => (
            <div key={feedback._id} className="mb-4 border border-gray-600 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg font-semibold">Feedback from: {feedback.from}</p>
                <span className={`px-2 py-1 rounded ${feedback.rating >= 4 ? 'bg-green-500' : 'bg-yellow-500'}`}>
                  {feedback.review} 
                </span>
              </div>
              <p>To: {feedback.to}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feedbacks;
