import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://192.168.189.5:3000/login', { userid, password });
        const { success, message } = response.data;

        if (success) {
            Alert.alert('Success', message);
            navigation.replace('Index'); // Navigating to the App component on successful login
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
  },
  label: {
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default LoginScreen;
