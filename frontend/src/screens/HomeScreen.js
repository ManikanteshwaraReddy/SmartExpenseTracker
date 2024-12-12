import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Expense Tracker</Text>
      <ExpenseForm />
      <ExpenseList />
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
});

export default HomeScreen;
