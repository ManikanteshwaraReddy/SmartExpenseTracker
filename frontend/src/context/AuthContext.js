import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (userData) => {
    try {
      // Simulate API request to /api/users/login
      const response = await axios.post('https://smart-expense-tracker-steel.vercel.app/api/users/login', {
        email: userData.email,
        password: userData.password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        await AsyncStorage.setItem('userToken', token);
        setToken(token);
        setUser(userData); // For now, just store userData
      } else {
        // Handle login error (e.g., invalid credentials)
        console.error('Login failed:', response.status);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    try{
          await AsyncStorage.removeItem('userToken');
    }
    catch(error){
        console.error('logout error', error);
    }
   
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
          setToken(storedToken);
          setUser({}); // Placeholder user data
        }
      } catch (error) {
        console.error('Error loading token:', error);
      }
    };

    loadToken();
  }, []);
  
  const getToken = () => {
      return token;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
