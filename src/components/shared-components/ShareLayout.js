import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
// import Footer from './Footer';
const ShareLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ShareLayout;
