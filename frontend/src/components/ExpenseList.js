import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Dummy data for demonstration
const dummyExpenses = [
  { id: '1', amount: 50, description: 'Groceries' },
  { id: '2', amount: 30, description: 'Gas' },
  { id: '3', amount: 20, description: 'Coffee' },
];

function ExpenseList() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.description}</Text>
      <Text>${item.amount}</Text>
    </View>
  );

  return (
    <FlatList
      data={dummyExpenses}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ExpenseList;
