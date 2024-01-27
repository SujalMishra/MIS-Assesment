// src/Feedbacks.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Feedbacks() {
  // State for feedback data
  const [feedbacks, setFeedbacks] = useState([]);

//   useEffect(async () => {
//     // Fetch feedback data from the backend API
//     const response = await axios.get('http://localhost:4000/feedbacks');
//     setFeedbacks(response.data.feedbacksData);
//   }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Display feedbacks */}
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Feedbacks</h2>
        {feedbacks.length === 0 ? (
          <p className="text-gray-400">No feedbacks available</p>
        ) : (
          feedbacks.map((feedback) => (
            <div key={feedback._id} className="mb-4 border border-gray-600 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg font-semibold">Feedback from {feedback.from}</p>
                <span className={`px-2 py-1 rounded ${feedback.rating >= 4 ? 'bg-green-500' : 'bg-yellow-500'}`}>
                  {feedback.rating}
                </span>
              </div>
              <p>{feedback.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feedbacks;
