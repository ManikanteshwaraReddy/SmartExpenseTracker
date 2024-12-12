import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function SettingsScreen({ navigation }) {
  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log('Logged out');
    navigation.navigate('Auth');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SettingsScreen;
