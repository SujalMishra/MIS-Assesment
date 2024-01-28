import React, { useState } from 'react';
import axios from 'axios';
import {Link , useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import { useUser } from '../UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { loginUser } = useUser();

  const handleLogin = async () => {
    console.log('Login clicked ');
    try {
      const response = await axios.post('http://localhost:4000/user/login/', {
        email: email,
        password: password,
      });
      Cookies.set('jwtoken', response.data.authToken, { expires: 1, path: '/' });
      loginUser(response.data.authToken, response.data.userData._id, response.data.userData.email);
      setUser(response.data);
      // localStorage.setItem('User', response.data.authToken);
      navigate("/home");
    } catch (error) {
      console.error('Error during login:', error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">User Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border-2 border-gray-600 rounded focus:outline-none focus:border-green-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border-2 border-gray-600 rounded focus:outline-none focus:border-green-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;