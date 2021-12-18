import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import HomeLogin from './pages/Login/HomeLogin';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound';

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLogin />} />
      <Route path="home/*" element={<Home />} />
      <Route path="login/*" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default routes;
