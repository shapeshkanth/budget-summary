import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const SERVER_URL = 'http://192.168.176.191:3000';

const App = () => {
  const [incomesAggregates, setIncomesAggregates] = useState(null);
  const [data, setData] = useState([]);
  const [bgColor, setBgColor] = useState('red');
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/balance`);
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };
    const fetchtoday = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/last-expense`);
        setExpense(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(() => {
      
      fetchBalance();
      fetchtoday();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchIncomesAggregates = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/summary/aggregates`);
        setIncomesAggregates(response.data);
      } catch (error) {
        console.error('Error fetching income aggregates:', error);
      }
    };

    const fetchIncomesData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/in_groupby`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching income data:', error);
      }
    };

    const intervalId = setInterval(() => {
      fetchIncomesAggregates();
      fetchIncomesData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  

  useEffect(() => {
    const toggleColor = () => {
      setBgColor((prevColor) => (prevColor === 'red' ? 'white' : 'red'));
    };

    const intervalId = setInterval(toggleColor, 200);
    return () => clearInterval(intervalId);
  }, []);

  const renderExpenseInfo = (category, avgValue, currentValue) => (
    <View style={styles.today}>
      <Text style={styles.textcontainer}>
        Today total '{category}' Expenses: {currentValue}
      </Text>
      {currentValue > avgValue ? (
        <View style={[styles.textbox, { backgroundColor: bgColor, borderRadius: 8, width: '100%' }]}>
          <Text style={styles.textcon1}>Overspending; you might need to reduce this type of inflation</Text>
        </View>
      ) : (
        <Text style={styles.textcon}>Good; keep it up</Text>
      )}
    </View>
  );

  if (!expense) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headtext}>Last 30 days summary</Text>
      {balance < 300 ? (
        <Text style={[styles.textcontainer, { color: bgColor }]}>Balance amount: {balance}</Text>
      ) : (
        <Text style={styles.textcontainer}>Balance amount: {balance}</Text>
      )}
      {incomesAggregates && (
        <View style={styles.component1}>
          <View style={[styles.component, { backgroundColor: '#ccc' }]}>
            <Text style={styles.head}>Expenses</Text>
            <Text style={styles.head}>Minimum</Text>
            <Text style={styles.head}>Maximum</Text>
            <Text style={styles.head}>Average</Text>
            <Text style={styles.head}>Sum</Text>
          </View>
          {['food', 'travel', 'shoping', 'medicine'].map((category) => (
            <View key={category} style={styles.component}>
              <Text style={styles.text}>{category}</Text>
              <Text style={styles.text}>{incomesAggregates[`min_${category}`]}</Text>
              <Text style={styles.text}>{incomesAggregates[`max_${category}`]}</Text>
              <Text style={styles.text}>{incomesAggregates[`avg_${category}`]}</Text>
              <Text style={styles.text}>{incomesAggregates[`sum_${category}`]}</Text>
            </View>
          ))}
        </View>
      )}
        {incomesAggregates && (
        <View>
      {expense.food > 0 ? renderExpenseInfo('food', incomesAggregates.avg_food, expense.food) : <Text></Text>}
      {expense.travel > 0 ? renderExpenseInfo('travel', incomesAggregates.avg_travel, expense.travel) : <Text></Text>}
      {expense.shoping > 0 ? renderExpenseInfo('shoping', incomesAggregates.avg_shoping, expense.shoping) : <Text></Text>}
      {expense.medicine > 0 ? renderExpenseInfo('medicine', incomesAggregates.avg_medicine, expense.medicine) : <Text></Text>}
        </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  textcontainer: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textcon1: {
    paddingHorizontal: 5,
    fontSize: 18,
    borderRadius: 8,
  },
  textcon: {
    fontSize: 18,
  },
  today: {
    marginTop: 20,
  },
  headtext: {
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
    fontSize: 23,
  },
  component: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  component1: {
    width: '108%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    paddingTop: 4,
    paddingBottom: 4,
  },
  head: {
    flex: 1,
    padding: 3,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textbox: {
    paddingHorizontal: 5,
    fontSize: 18,
    borderRadius: 8,
  },
});

export default App;
