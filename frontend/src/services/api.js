import axios from 'axios';
import { useContext } from 'react'; // Add this import
import { AuthContext } from '../context/AuthContext';

const API_URL = 'https://smart-expense-tracker-steel.vercel.app';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token directly from localStorage or use useContext properly
    const token = localStorage.getItem('token'); // Recommended approach if you're storing token in localStorage
    
    // Alternative if you must use AuthContext:
    // const { getToken } = useContext(AuthContext);
    // const token = getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getExpenses = async (startDate, endDate) => {
  try {
    let url = '/api/expenses';
    if (startDate && endDate) {
      url += `?start_date=${startDate}&end_date=${endDate}`;
    } else if (startDate) {
      url += `?start_date=${startDate}`;
    } else if (endDate) {
      url += `?end_date=${endDate}`;
    }
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const addExpense = async (expense) => {
  try {
    expense.isRecurring = expense.isRecurring || false;
    const response = await api.post('/api/expenses', expense);
    return response.data;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

export const updateExpense = async (id, expense) => {
  try {
    expense.isRecurring = expense.isRecurring || false;
    const response = await api.put(`/api/expenses/${id}`, expense);
    return response.data;
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await api.delete(`/api/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};

export default api;