import axios from 'axios';

const API_URL = 'https://smart-expense-tracker-beta.vercel.app';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getExpenses = async () => {
  try {
    const response = await api.get('/expenses');
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const addExpense = async (expense) => {
  try {
    const response = await api.post('/expenses', expense);
    return response.data;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

export const updateExpense = async (id, expense) => {
  try {
    const response = await api.put(`/expenses/${id}`, expense);
    return response.data;
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};

export default api;
