import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [userdata, setUserdata] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    whatsapp_number: '0',
    licenseNumber: '',
  });

  const handleChanges = (e) => {
    setUserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async () => {
    console.log('Sign Up clicked', userdata);
    try {
      const response = await axios.post('http://localhost:4000/signupuser', {
        email: userdata.email,
        password: userdata.password,
        confirmPassword: userdata.confirmPassword,
        name: userdata.name,
        whatsapp_number: userdata.whatsapp_number,
        licenseNumber: userdata.licenseNumber,
      });

      console.log(response.data);
      // setUser(response.data);
      localStorage.setItem('User', response.data.authToken);
    } catch (error) {
      console.error('Error during signup:', error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border-2 border-gray-600 rounded focus:outline-none focus:border-green-500"
              placeholder="Enter your email"
              value={userdata.email}
              onChange={handleChanges}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-400">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 p-2 w-full border-2 border-gray-600 rounded focus:outline-none focus:border-green-500"
              placeholder="Enter your Name"
              value={userdata.name}
              onChange={handleChanges}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-400">
              License Number
            </label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              className="mt-1 p-2 w-full border-2 border-gray-600 rounded focus:outline-none focus:border-green-500"
              placeholder="Enter your License Number"
              value={userdata.licenseNumber}
              onChange={handleChanges}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="whatsapp_number" className="block text-sm font-medium text-gray-400">
              WhatsApp Number
            </label>
            <input
              type="number"
              id="whatsapp_number"
              name="whatsapp_number"
              className="mt-1 p-2 w-full border-2 border-gray-600 rounded focus:outline-none focus:border-green-500"
              placeholder="Enter your WhatsApp Number"
              value={userdata.whatsapp_number}
              onChange={handleChanges}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border-2 border-gray-600 rounded focus:outline-none focus:border-green-500"
              placeholder="Enter your password"
              value={userdata.password}
              onChange={handleChanges}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 p-2 w-full border-2 border-gray-600 rounded focus:outline-none focus:border-green-500"
              placeholder="Confirm your password"
              value={userdata.confirmPassword}
              onChange={handleChanges}
            />
          </div>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
