import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Stored user:', storedUser);

    const fetchUserData = async () => {
      setIsLoading(true);

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          const tokenExpiration = jwtDecode(parsedUser).exp * 1000;
          if (tokenExpiration < Date.now()) {
            console.log("token expired")
            logout();
          }
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  const login = userData => {
    setUser(userData.token);
    localStorage.setItem('user', JSON.stringify(userData.token));
    console.log('User logged in:', userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    console.log('User logged out');
  };

  console.log('Current user:', user);
  console.log('Is loading:', isLoading);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
