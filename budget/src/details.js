import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const App = () => {
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://192.168.189.5:3000/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddExpense = async () => {
    if (expenseName && amount && category) {
      try {
        const response = await axios.post('http://192.168.189.5:3000/addExpense', {
          name: expenseName,
          amount,
          category
        });
        setExpenses([...expenses, response.data]);
        setExpenseName('');
        setAmount('');
        setCategory('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Expense Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter expense name"
          value={expenseName}
          onChangeText={setExpenseName}
        />

        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Category......" value="" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Transport" value="travel" />
          <Picker.Item label="Medicine" value="medicine" />
          <Picker.Item label="Shopping" value="shopping" />
          <Picker.Item label="Entertainment" value="Entertainment" />
          <Picker.Item label="Others" value="others" />
        </Picker>

        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          value={amount}
          keyboardType="numeric"
          onChangeText={setAmount}
        />

        <Button title="Add Expense" onPress={handleAddExpense} />
      </View>
      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseText}>{item.name}</Text>
            <Text style={styles.expenseText}>{item.amount}</Text>
            <Text style={styles.expenseText}>{item.category}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  picker: {
    height: 50,
    marginBottom: 16,
    borderColor: 'black',
    borderWidth: 1,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  expenseText: {
    fontSize: 16,
  },
});

export default App;