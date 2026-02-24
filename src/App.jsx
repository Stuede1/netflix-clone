import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
 import { ToastContainer, toast } from 'react-toastify';

const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Only redirect to home if currently on login page
        if (window.location.pathname === '/login') {
          navigate("/")
        }
      } else {
        // Only redirect to login if not already on login page
        if (window.location.pathname !== '/login') {
          navigate("/login")
        }
      }
    });
  }, [navigate]);

  return (
    <>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <AppContent />
      </div>
    </BrowserRouter>
  );
};

export default App;
