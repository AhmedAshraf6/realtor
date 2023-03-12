import React from 'react';
import { Navigate, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';
import LoadingSpinned from './LoadingSpinned';

const PrivateRoute = () => {
  const { loggedIn, checkStatus } = useAuth();
  return checkStatus ? (
    <LoadingSpinned />
  ) : loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to='/signin' />
  );
};

export default PrivateRoute;
