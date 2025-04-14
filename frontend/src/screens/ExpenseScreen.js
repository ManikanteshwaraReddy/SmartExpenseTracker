import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../services/api';

function ExpenseScreen() {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchExpenses = async (start = null, end = null) => {
    try {
      const fetchedExpenses = await getExpenses(start, end);
      setExpenses(fetchedExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses(startDate, endDate);
  }, [startDate, endDate]);

  const handleAddOrUpdateExpense = async (expense) => {
    try {
      if (selectedExpense) {
        const updatedExpense = await updateExpense(selectedExpense._id, expense);
        setExpenses(expenses.map(e => (e._id === selectedExpense._id ? updatedExpense : e)));
        setSelectedExpense(null);
      } else {
        const newExpense = await addExpense(expense);
        setExpenses([...expenses, newExpense]);
      }
    } catch (error) {
      console.error('Error adding/updating expense:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter(e => e._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses</Text>
      <ExpenseForm
        onSubmit={handleAddOrUpdateExpense}
        expense={selectedExpense}
      />
      <View style={styles.filterContainer}>
        <Button title="Filter by Start Date" onPress={() => setStartDate(new Date())} />
        <Button title="Filter by End Date" onPress={() => setEndDate(new Date())} />
        {(startDate || endDate) && <Button title="Clear Filters" onPress={() => { setStartDate(null); setEndDate(null); }} />}
      </View>
      <ExpenseList
        expenses={expenses}
        onEdit={setSelectedExpense}
        onDelete={handleDeleteExpense}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 30,
  },
});

export default ExpenseScreen;
