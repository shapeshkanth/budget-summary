import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Autocomplete from 'react-native-autocomplete-input';
import _ from 'lodash';

const SERVER_URL = 'http://192.168.189.5:3000';

const IncomeScreen = () => {
  const [query, setQuery] = useState('');
  const [amount, setAmount] = useState('');
  const [incomeId, setId] = useState('');
  const [incomes, setIncomes] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchIncomes();
    fetchData();
  }, []);

  const fetchIncomes = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/income`);
      setIncomes(response.data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/exp`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const findData = _.debounce((query) => {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
      setFilteredData(data.filter(item => item.name.search(regex) >= 0));
    } else {
      setFilteredData([]);
    }
    setQuery(query);
  }, 300);

  const handleEdit = (incomeId, incomeName, amount) => {
    setIsEditMode(true);
    setQuery(incomeName);
    setAmount(amount.toString());
    setId(incomeId);
  };

  const update = async () => {
    try {
      await axios.put(`${SERVER_URL}/income/${incomeId}`, { income_name: query, amount });
      fetchIncomes();
      setQuery('');
      setAmount('');
      setIsEditMode(false);
      Alert.alert('Success', 'Income updated successfully!', [{ text: 'OK' }], { cancelable: false });
    } catch (error) {
      console.error('Error updating income:', error);
      Alert.alert('Error', 'Failed to update income. Please try again later.', [{ text: 'OK' }], { cancelable: false });
    }
  };

  const createIncome = async () => {
    try {
      await axios.post(`${SERVER_URL}/income`, { income_name: query, amount });
      fetchIncomes();
      setQuery('');
      setAmount('');
      Alert.alert('Success', 'Income created successfully!', [{ text: 'OK' }], { cancelable: false });
    } catch (error) {
      console.error('Error creating income:', error);
    }
  };

  const handleDelete = async (incomeId) => {
    try {
      await axios.delete(`${SERVER_URL}/income/${incomeId}`);
      fetchIncomes();
      Alert.alert('Success', 'Income deleted successfully!', [{ text: 'OK' }], { cancelable: false });
    } catch (error) {
      console.error('Error deleting income:', error);
      Alert.alert('Error', 'Failed to delete income. Please try again later.', [{ text: 'OK' }], { cancelable: false });
    }
  };

  const confirmDelete = (index) => {
    Alert.alert('Confirm Deletion', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => handleDelete(index) },
    ], { cancelable: false });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      setQuery(item.name);
      setAmount(item.amount.toString());
      setFilteredData([]);
    }}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.inputContainer}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          inputContainerStyle={styles.autocompleteInputContainer}
          data={filteredData}
          defaultValue={query}
          onChangeText={(text) => findData(text)}
          placeholder="Enter income name"
          flatListProps={{
            keyExtractor: item => item.id.toString(),
            renderItem: renderItem,
          }}
        />
        <TextInput
          style={styles.quantityInput}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
        {isEditMode ? (
          <Button title="Update" onPress={update} style={styles.updateButton} />
        ) : (
          <Button title="Add Income" onPress={createIncome} />
        )}
      </View>
      <View style={styles.head}>
        <Text style={styles.income}>Income</Text>
        <Text style={styles.amount}>Amount</Text>
        <Text style={styles.action}>Action</Text>
      </View>
      <FlatList
        data={incomes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.income_name}</Text>
            <Text>{item.amount}</Text>
            <View style={styles.butt}>
              <TouchableOpacity style={styles.edit} onPress={() => handleEdit(item.id, item.income_name, item.amount)}>
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.delete} onPress={() => confirmDelete(item.id)}>
                <Text>Delete</Text>
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
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  autocompleteInputContainer: {
    marginTop: '3%',
    width: '100%',
    borderWidth: 1.5,
    borderColor: 'black',
    alignSelf: 'center',
  },
  itemText: {
    fontSize: 18,
    paddingVertical: 7,
    borderWidth:0.2,
    paddingLeft: 4,
    borderColor: 'gray'
  },
  quantityInput: {
    marginTop: '18%',
   marginBottom:6,
    height: 40,
    borderColor: '#000',
    borderWidth: 1.4,
    paddingHorizontal: 10,
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
  },
});

export default IncomeScreen;
