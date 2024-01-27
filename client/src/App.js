import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './landing';
import Login from './components/Login';
import SignUp from './components/Signup';
import Home from './components/Home';

function App() {
  return (
    <Home />
  );
}

export default App;
