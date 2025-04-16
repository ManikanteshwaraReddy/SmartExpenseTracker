import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);

  const handleSignup = async () => {
    setError('');
    const result = await signup({ email: email, password: password });
    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Signup</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Signup" onPress={handleSignup} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { borderWidth: 1, marginBottom: 10, padding: 10 },
    error: { color: 'red', marginBottom: 10 },
});

export default SignupScreen;