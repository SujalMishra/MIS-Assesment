// src/CreateRide.js
import React, { useState } from 'react';

const CreateRide = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    driverName: '',
    carNumber: '',
    startLocation: '',
    endLocation: '',
    startTime: '',
    endTime: '',
    numberOfCompanions: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Your logic to handle the form submission (e.g., send data to the server)
    console.log('Form data submitted:', formData);
    // Clear the form after submission
    setFormData({
      driverName: '',
      carNumber: '',
      startLocation: '',
      endLocation: '',
      startTime: '',
      endTime: '',
      numberOfCompanions: '',
    });
  };

  return (
    <div className="w-1/2 mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create a Ride</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Driver Name */}
        <div>
          <label htmlFor="driverName" className="block text-white">
            Driver Name:
          </label>
          <input
            type="text"
            id="driverName"
            name="driverName"
            value={formData.driverName}
            onChange={handleChange}
            required
            className="w-full p-2 border text-black border-gray-400 rounded"
          />
        </div>

        {/* Car Number */}
        <div>
          <label htmlFor="carNumber" className="block text-white">
            Car Number:
          </label>
          <input
            type="text"
            id="carNumber"
            name="carNumber"
            value={formData.carNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border text-black border-gray-400 rounded"
          />
        </div>

        {/* Start Location */}
        <div>
          <label htmlFor="startLocation" className="block text-white">
            Start Location:
          </label>
          <input
            type="text"
            id="startLocation"
            name="startLocation"
            value={formData.startLocation}
            onChange={handleChange}
            required
            className="w-full p-2 border text-black border-gray-400 rounded"
          />
        </div>

        {/* End Location */}
        <div>
          <label htmlFor="endLocation" className="block text-white">
            End Location:
          </label>
          <input
            type="text"
            id="endLocation"
            name="endLocation"
            value={formData.endLocation}
            onChange={handleChange}
            required
            className="w-full p-2 border text-black border-gray-400 rounded"
          />
        </div>

        {/* Start Date and Time */}
        <div>
          <label htmlFor="startTime" className="block text-white">
            Start Date and Time:
          </label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="w-full p-2 border text-black border-gray-400 rounded"
          />
        </div>

        {/* End Date and Time */}
        <div>
          <label htmlFor="endTime" className="block text-white">
            End Date and Time:
          </label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            className="w-full p-2 border text-black border-gray-400 rounded"
          />
        </div>

        {/* Number of Companions */}
        <div>
          <label htmlFor="numberOfCompanions" className="block text-white">
            Number of Companions:
          </label>
          <input
            type="number"
            id="numberOfCompanions"
            name="numberOfCompanions"
            value={formData.numberOfCompanions}
            onChange={handleChange}
            required
            className="w-full p-2 border text-black border-gray-400 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Create Ride
        </button>
      </form>
    </div>
  );
};

export default CreateRide;
