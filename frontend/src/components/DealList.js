import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Dummy data for demonstration
const dummyDeals = [
  { id: '1', title: '50% off Uber rides', description: 'Valid for first-time users' },
  { id: '2', title: '$10 off Food Delivery', description: 'Use code SAVE10' },
];

function DealList() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      data={dummyDeals}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 10,
  },
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default DealList;
