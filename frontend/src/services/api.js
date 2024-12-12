import axios from 'axios';

const API_URL = 'https://smart-expense-tracker-beta.vercel.app/';

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${API_URL}/expenses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const addExpense = async (expense) => {
  try {
    const response = await axios.post(`${API_URL}/expenses`, expense);
    return response.data;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

// Add more API functions as needed
