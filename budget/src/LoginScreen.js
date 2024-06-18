import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://192.168.169.5:3000/login', { userid, password });
        const { success, message, username, email } = response.data;
        if (success) {
            Alert.alert('Success', message);
            navigation.replace('Index', { userid, username, email }); // Navigating to the App component on successful login
        } else {
            Alert.alert('Error', message);
        }
    } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Something went wrong');
    }
};

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signUpLink}>
        <Text style={styles.signUpText}>Sign Up</Text>
    </TouchableOpacity>
    <Title style={styles.title}>Login</Title>
    <TextInput
        label="UserID"
        value={userid}
        onChangeText={setUserid}
        style={styles.input}
    />
    <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry={true}  // Changed to secureTextEntry for password input
    />
    <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
    </Button>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ffffff', // Optional: Set background color
  },
  label: {
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center', // Center-align the title
  },


  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  signUpLink: {
    alignSelf: 'flex-end',
    marginTop: 0,
  },
  signUpText: {
    fontSize: 16,
    color: '#007bff',
  },
  button: {
    marginTop: 24,
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#410863', // Example color, customize as needed
  },
});

export default LoginScreen;
