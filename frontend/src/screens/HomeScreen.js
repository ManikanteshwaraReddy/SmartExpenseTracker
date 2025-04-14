import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Expense Tracker</Text>
      <Button
        title="Add Expense"
        onPress={() => navigation.navigate('Expenses')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
  },
  button: {
    backgroundColor: '#007AFF', // Example color, adjust as needed
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
      marginBottom: 40, // Increased margin for better spacing
      textAlign: 'center', // Center the title
  },
});

export default HomeScreen;
