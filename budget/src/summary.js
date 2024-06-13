import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const SERVER_URL = 'http://192.168.189.5:3000';

const App = () => {
  const [incomesAggregates, setIncomesAggregates] = useState(null);
  const [data, setData] = useState([]);
  const [bgColor, setBgColor] = useState('red');

  useEffect(() => {
    const toggleColor = () => {
      setBgColor((prevColor) => (prevColor === 'red' ? 'white' : 'red'));
    };

    const interval = setInterval(toggleColor, 200); 
    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    fetchIncomesAggregates();
  }, []);
  useEffect(() => {
    fetchIncomesData();
  }, []);

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

  const filteredData1 = data.filter(item => item.income_name === 'a');
  const filteredData2 = data.filter(item => item.income_name === 'b');
  const filteredData3 = data.filter(item => item.income_name === 'Salary');
  const filteredData4 = data.filter(item => item.income_name === 'Skanth');

  return (
    <View style={styles.container}>
      <Text style={styles.headtext}>Last 30 days summary</Text>
      <Text style={styles.textcontainer}>this month total income is</Text>
      <Text style={styles.textcontainer}>this month total expences is</Text>
      <Text style={styles.textcontainer}>Balance amount</Text>
      {incomesAggregates && (
      <View style={styles.component1}>
        <View style={[styles.component,{backgroundColor: '#ccc'}]}>
          <Text style={styles.head}>Expences</Text>
          <Text style={styles.head}>Minimum</Text>
          <Text style={styles.head}>Maximum</Text>
          <Text style={styles.head}>Average</Text>
          <Text style={styles.head}>Sum</Text>
          </View>
          <View style={styles.component}>
          <Text style={styles.text}>Food       </Text>
          <Text style={styles.text}>{incomesAggregates.min_food}</Text>
          <Text style={styles.text}>{incomesAggregates.max_food}</Text>
          <Text style={styles.text}>{incomesAggregates.avg_food}</Text>
          <Text style={styles.text}>{incomesAggregates.sum_food}</Text>
        
        </View>
        <View style={styles.component}>
          <Text style={styles.text}>travel      </Text>
          <Text style={styles.text}>{incomesAggregates.min_travel}</Text>
          <Text style={styles.text}>{incomesAggregates.max_travel}</Text>
          <Text style={styles.text}>{incomesAggregates.avg_travel}</Text>
          <Text style={styles.text}>{incomesAggregates.sum_travel}</Text>
        
        </View>
        <View style={styles.component}>
          <Text style={styles.text}>shoping      </Text>
          <Text style={styles.text}>{incomesAggregates.min_shoping}</Text>
          <Text style={styles.text}>{incomesAggregates.max_shoping}</Text>
          <Text style={styles.text}>{incomesAggregates.avg_shoping}</Text>
          <Text style={styles.text}>{incomesAggregates.sum_shoping}</Text>
        
        </View>
        <View style={styles.component}>
          <Text style={styles.text}>medicine      </Text>
          <Text style={styles.text}>{incomesAggregates.min_medicine}</Text>
          <Text style={styles.text}>{incomesAggregates.max_medicine}</Text>
          <Text style={styles.text}>{incomesAggregates.avg_medicine}</Text>
          <Text style={styles.text}>{incomesAggregates.sum_medicine}</Text>
        
        </View>
        </View>
      )}
       {filteredData1.length > 0 ? (
        <View style={styles.today}>
          <Text style={styles.textcontainer}>
          Today total 'food' Expenses : {filteredData1[0].total_amount} 
          </Text >
          
          {filteredData1[0].total_amount > incomesAggregates.avg_food ? (
            <View style={[styles.textbox, {backgroundColor: bgColor,borderRadius: 8,width: '110%'}]}>
            <Text style={styles.textcon1}>Overspending; you might need  to reduce this type of inflation</Text>
            </View>
          ) : (
            <Text style={styles.textcon}>good; keep it up                                             </Text>
          )}
        </View>
      ) : (
        <Text>No data found for Income Name 'a'</Text>
      )}
      {filteredData2.length > 0 ? (
        <View style={styles.today}>
          <Text style={styles.textcontainer}>
          Today total 'travel' Expenses : {filteredData2[0].total_amount} 
          </Text >
          
          {filteredData2[0].total_amount > incomesAggregates.avg_travel ? (
            <View  style={[styles.textbox, {backgroundColor: bgColor,borderRadius: 8,width: '110%'}]}>
            <Text style={styles.textcon1}>Overspending; you might need  to reduce this type of inflation</Text>
            </View>
          ) : (
            <Text style={styles.textcon}>good; keep it up                                                 </Text>
          )}
        </View>
      ) : (
        <Text>No data found for Income Name 'a'</Text>
      )}
      {filteredData3.length > 0 ? (
        <View style={styles.today}>
          <Text style={styles.textcontainer}>
          Today total 'shoping' Expenses : {filteredData3[0].total_amount} 
          </Text >
          
          {filteredData3[0].total_amount > incomesAggregates.avg_shoping ? (
            <View  style={[styles.textbox, {backgroundColor: bgColor,borderRadius: 8,width: '110%'}]}>
            <Text style={styles.textcon1}>Overspending; you might need  to reduce this type of inflation</Text>
            </View>
          ) : (
            <Text style={styles.textcon}>good; keep it up                                              </Text>
          )}
        </View>
      ) : (
        <Text>No data found for Income Name 'a'</Text>
      )}
      {filteredData4.length > 0 ? (
        <View style={styles.today}>
          <Text style={styles.textcontainer}>
          Today total 'medicine' Expenses : {filteredData4[0].total_amount} 
          </Text >
          
          {filteredData4[0].total_amount > incomesAggregates.avg_medicine ? (
            <View  style={[styles.textbox, {backgroundColor: bgColor,borderRadius: 8,width: '110%'}]}>
            <Text style={styles.textcon1}>Overspending; you might need  to reduce this type of inflation</Text>
            </View>
          ) : (
            <View  style={styles.textbox}>
            <Text style={styles.textcon}>good; keep it up                                                  </Text>
            </View>
          )}
        </View>
      ) : (
        <Text>No data found for Income Name 'a'</Text>
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
  today: {
   color: '#ccc',
   textAlign: 'right',
  },
  textcon1: {
    
   // backgroundColor: 'red',
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
   // backgroundColor: '#ccc', 
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
});

export default App;
