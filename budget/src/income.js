// IncomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

const SERVER_URL = 'http://192.168.169.5:3000'; // Update with your server URL

const IncomeScreen = () => {
  const [incomeName, setIncomeName] = useState('');
  const [amount, setAmount] = useState('');
  const [incomeId, setId] = useState('');
  const [incomes, setIncomes] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/income`);
      setIncomes(response.data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const handleEdit = (incomeId, incomeName, amount) => {
  
    setIsEditMode(true);
    setIncomeName(incomeName);
    setAmount(amount.toString());
    setId(incomeId);

  };
  const update = async () => {
    try {
      await axios.put(`${SERVER_URL}/income/${incomeId}`, { income_name: incomeName, amount });
      fetchIncomes();
      setIncomeName('');
      setAmount('');
      setIsEditMode(false);
      Alert.alert(
        'Success',
        'Income updated successfully!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error updating income:', error);
      Alert.alert(
        'Error',
        'Failed to update income. Please try again later.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    }
  };
  
  
  
  const createIncome = async () => {
    try {
      await axios.post(`${SERVER_URL}/income`, { income_name: incomeName, amount });
      fetchIncomes();
      setIncomeName('');
      setAmount('');
      Alert.alert(
        'Success',
        'Income created successfully!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error creating income:', error);
    }
  };
  

  const handleDelete = async (incomeId) => {
    try {
      await axios.delete(`${SERVER_URL}/income/${incomeId}`);
      fetchIncomes(); // Refresh the income list after deletion
      Alert.alert(
        'Success',
        'Income deleted successfully!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error deleting income:', error);
      Alert.alert(
        'Error',
        'Failed to delete income. Please try again later.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    }
  };
  
  

  const confirmDelete = (index) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => handleDelete(index) },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}></Text> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Income Name"
          value={incomeName}
          onChangeText={setIncomeName}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount.toString()}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
         {isEditMode ? (
          
  <Button title="Update" onPress={update}  style={styles.updateButton}/>
) : (
  <Button title="Add Income" onPress={createIncome} />
)}
      </View>
      <View style={styles.head}>
        <Text style={styles.income}>income</Text>
        <Text style={styles.amount}>amount</Text>
        <Text style={styles.action}>action</Text>
      </View>
      <FlatList
        data={incomes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.income_name}</Text>
            <Text>{item.amount}</Text>
            <View style={styles.butt}>
            <TouchableOpacity style={styles.edit}  onPress={() => handleEdit(item.id, item.income_name, item.amount)}>
              <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.delete} onPress={() => confirmDelete(item.id)}>
              <Text>delete</Text>
            </TouchableOpacity>
          </View>
          </View>
          
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#F7F7F7',
    borderColor: '#ccc',
    borderRadius: 4,
    paddingRight: 0,
  },
  butt: {
    flexDirection: 'row',
    padding: 0,
    borderRadius: 10,
  },
  edit: {
    backgroundColor: '#9AFFBF',
    marginRight: 7,
    padding: 4,
    borderRadius: 3,
  },
  delete: {
    backgroundColor: '#FF6F6F',
    padding: 4,
    borderRadius: 3,
  },
  amount: {
marginLeft: -20,
fontSize: 18,
  },
  action: {
    marginRight: 18,
    fontSize: 18,
  },
  updateButton: {
    backgroundColor: 'green', 
    padding: 10,
    borderRadius: 4,
  },
  income: {
    fontSize: 18, 
  }
});

export default IncomeScreen;
