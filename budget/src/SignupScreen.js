import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, } from 'react-native';
import { TextInput, Title, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {

    
        const [username, setUsername] = useState('');
        const [userid, setUserId] = useState('');
        const [birthdate, setBirthdate] = useState(new Date()); // Initialize birthdate state with a default value
        const [showDatePicker, setShowDatePicker] = useState(false); // Control visibility of DateTimePicker
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [displayDate, setDisplayDate] = useState(''); // State for displaying selected birthdate
      
        const handleSignIn = async () => {
          if (!username || !userid || !email || !password) {
            Alert.alert('Error', 'All fields are required.');
            return;
          }
      
          if (!email.includes('@')) {
            Alert.alert('Invalid Email', 'Please enter @');
            return;
          }
      
          const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{6,})/;
          if (!passwordRegex.test(password)) {
            Alert.alert('Invalid Password', 'Password must be at least 6 characters long and include at least one special character(?=.*[!@#$%^&*]).');
            return;
          }
      
          try {
            axios.post('http://192.168.176.191:3000/signup', {
              username,
              userid,
              email,
              password,
              birthdate,
            });  
            Alert.alert('Success', 'Signup successful!');
            navigation.goBack();
            
          } catch (error) {
            console.error('Error signing in:', error);
            Alert.alert('Error', 'Failed to sign in. Please try again.');
          }
        };
      
        // Function to handle validation and formatting of userId
        const handleUserIdBlur = () => {
          // Example: year/letters/numbers (e.g., 2019/ASP/87)
          const regex = /^(\d{4})\/([A-Za-z]{1,3})\/(\d{1,3})$/; // Regex pattern for the format 2019/ASP/87
      
          if (regex.test(userid)) {
            // Valid format
            return;
          } else {
            // Invalid format
            Alert.alert('Invalid Format', 'User ID should be in the format: 2019/ASP/87');
            setUserId(''); // Clear userId state or handle as needed
          }
        };
      
        const onChangeDate = (event, selectedDate) => {
          const currentDate = selectedDate || birthdate;
          setShowDatePicker(false); // Hide DateTimePicker after selection
          setBirthdate(currentDate); // Update birthdate state
          // Format the date for display
          const formattedDate = currentDate.toLocaleDateString(); // You can adjust the formatting as needed
          setDisplayDate(formattedDate); // Update state for displaying the formatted date
        };

  return (
    <View style={styles.container}>
      <View style={styles.backbutton}>
    <Button title="Back"  onPress={() => navigation.goBack()} />
      </View>
      <Title style={styles.title}>Signin</Title>

      <TextInput
        style={styles.input}
        label="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        label="User ID"
        value={userid}
        onChangeText={setUserId} // Allow the user to type freely
        onBlur={handleUserIdBlur} // Validate format when focus is lost
      />
      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.datebutton}>
      <Button title="Birthdate" onPress={() => setShowDatePicker(true)} />
      </View> 
      {showDatePicker && (
        <DateTimePicker
          value={birthdate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      {displayDate !== '' && <Text style={styles.selectedDateText}>Birthdate: {displayDate}</Text>}
      <View   style={styles.button}>
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
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
    fontSize: 18,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center', // Center-align the title
  },
  button: {
 marginTop: 20, 
  },
  backbutton :{
   width:100,
   marginTop:-20,
   marginBottom:10,
  },
  datebutton :{
    width:100,
  },
});

export default SignupScreen;
