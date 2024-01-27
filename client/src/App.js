import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './App.css';
import LandingComponent from './landing';
import LoginComponent from './components/Login';
import SignUpComponent from './components/Signup';
import Home from './components/Home';
import { UserProvider } from './UserContext';

function App() {
  const [cookie, setCookie] = useCookies();
  

  return (
    <UserProvider>
      <Router>
        { cookie.jwtoken ? (
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<LandingComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signUp" element={<SignUpComponent />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Router>
    </UserProvider>
  );
}

export default App;