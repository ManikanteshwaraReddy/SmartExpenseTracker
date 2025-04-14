import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (userData) => {
    try {
      const response = await axios.post('https://smart-expense-tracker-steel.vercel.app/api/users/login', {
        email: userData.email,
        password: userData.password,
      });

      const { token, user } = response.data; // Assuming the API returns both token and user data
      
      await AsyncStorage.setItem('userToken', token);
      if (user) {
        await AsyncStorage.setItem('userData', JSON.stringify(user));
      }
      
      setToken(token);
      setUser(user || userData); // Use API user data if available, fallback to form data
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'userData']);
      setToken(null);
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'Logout failed' };
    }
  };

  const loadUserData = useCallback(async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem('userToken'),
        AsyncStorage.getItem('userData')
      ]);

      if (storedToken) {
        setToken(storedToken);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const getToken = useCallback(() => token, [token]);

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    getToken,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};