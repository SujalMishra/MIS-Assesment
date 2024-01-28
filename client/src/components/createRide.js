// src/CreateRide.js
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import { useUser } from '../UserContext';

const CreateRide = () => {
  
  const {user} = useUser();
const [phone, setPhone] = useState('');

  const handlePhoneChange = (value) => {
    setPhone(value);
    setFormData({
      ...formData,
      phone: value,
    });
  };


  const [formData, setFormData] = useState({
    driverName: '',
    carNumber: '',
    startLocation: '',
    endLocation: '',
    startTime: '',
    endTime: '',
    numberOfCompanions: '',
  });

 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Form data submitted:', formData);
   
    setFormData({
      driverName: '',
      carNumber: '',
      startLocation: '',
      endLocation: '',
      startTime: '',
      endTime: '',
      numberOfCompanions: '',
    });
    console.log(phone +  " " + user.email + " " + formData.driverName + " " + formData.carNumber + " " + formData.startLocation + " " + formData.endLocation + " " + formData.startTime + " " + formData.endTime + " " + formData.numberOfCompanions   );
    try {
      const response = await axios.post('http://localhost:4000/trip/', {
        driverName: formData.driverName,
        driverPhoneNumber: phone,
        driverMail: user.email,
        cabNumber: formData.carNumber,
        startlocation: formData.startLocation,
        endlocation: formData.endLocation,
        status: 'Available',
        numberofCompanions: formData.numberOfCompanions,
        companions:[],
        startTime: formData.startTime,
        endTime: formData.endTime,
        Feedback:[]
      });
      
      console.log("hello")
    } catch (error) {
      console.error('Error during signup:', error.response.data.message);
    }
  };

 

  return (
    <div className="w-1/2 mx-auto bg-gray-800 p-8 rounded-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Create a Ride</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
       
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
        <div>
        <label htmlFor="whatsapp_number" className="block text-sm font-medium text-gray-400">
              WhatsApp Number
            </label>
            <PhoneInput
              id="whatsapp_number"
              name="whatsapp_number"
              className="mt-1 p-2 w-full border-2 text-black border-gray-600 rounded focus:outline-none focus:border-green-500"
              placeholder="Enter your WhatsApp Number"
              value={phone}
              onChange={handlePhoneChange}
            />
        </div>

      
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
