import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvide';

export const PrivateGuard = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);

  console.log(user)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <>{children}</>;
  }

  return <Navigate to="/" replace />;
};

export const GuestGuard = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/user/home" replace />;
  }

  return <>{children}</>;
};
