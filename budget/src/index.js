import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';

const SERVER_URL = 'http://192.168.189.5:3000';
const ProgressBar = ({ label, progress }) => {
  // Generate a random hue value between 0 and 360
  const hue = Math.floor(Math.random() * 360);
  const color = `hsl(${hue}, 70%, 50%)`;

  return (
    <View style={styles.progressBar}>
      <View style={[styles.progress, { width: `${progress}%`, backgroundColor: color }]} />
    </View>
  );
};

const ChartExample = () => {
  
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/income__`);
      setIncomes(response.data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
      // Optionally, you can display an error message to the user
      // Alert.alert('Error', 'Failed to fetch incomes. Please try again later.');
    }
  };
  const calculateProgress = (amount, totalIncome) => {
    return (amount / totalIncome) * 100;
  };
  const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
  const data = incomes.map((income) => {
    const hue = Math.floor(Math.random() * 360);
    return {
      name: income.income_name,
      amount: income.amount,
      color: `hsl(${hue}, 70%, 50%)`,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Income Distribution</Text>
      <View style={styles.chartContainer}>
        <PieChart
          data={data}
          width={381}
          height={250}
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
         
        />
      </View>
      <View style={styles.container1}>
      <View style={styles.progressback}> 
      <FlatList
        data={incomes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View style={styles.proback}>
          
            <View style={styles.text1}>
              <Text>{item.income_name}</Text>
              <Text style={styles.text2}> {calculateProgress(item.amount, totalIncome).toFixed(2)}%</Text>
              <Text style={styles.text3}> {item.amount}/=</Text>
            </View>
            <ProgressBar
              label={item.income_name}
              progress={calculateProgress(item.amount, totalIncome)}
             />
        
          </View>
        )}
      />
      </View>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  container1: {
    flex: 1,
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    borderWidth: 2,
    width: '90%',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 0.1,
  },
  progress: {
    height: '100%',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  text2: {
    textAlign: 'right',
  },
  text1: {
    flexDirection: 'row',
    padding: 3
  },
  text3: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 5,
  },
  proback: {
    paddingHorizontal:8,
    marginHorizontal: '8%',
    justifyContent: 'center',
    height: 55,
    width: '87%',
    backgroundColor: '#E7ECFD',
    borderColor: '#B2B2B2',
    borderWidth: 0.5,
    borderRadius: 8,
  },
  progressback: {
    width: '98%',
    
    
  
  },
});

export default ChartExample;