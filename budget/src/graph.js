import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cl_f, setCL_f] = useState(null);
  const [ucl_f, setUCL_f] = useState(null);
  const [lcl_f, setLCL_f] = useState(null);
  const [cl_t, setCL_t] = useState(null);
  const [ucl_t, setUCL_t] = useState(null);
  const [lcl_t, setLCL_t] = useState(null);
  const [cl_s, setCL_s] = useState(null);
  const [ucl_s, setUCL_s] = useState(null);
  const [lcl_s, setLCL_s] = useState(null);
  const [cl_m, setCL_m] = useState(null);
  const [ucl_m, setUCL_m] = useState(null);
  const [lcl_m, setLCL_m] = useState(null);

  const fetchIncomes = () => {
    axios.get('http://192.168.176.191:3000/income_graph') // Adjust the URL to match your backend server
      .then(response => {
        setData(response.data);
        const f = response.data.map(item => item.food);
        calculateControlLimits(f, 'food');
        const t = response.data.map(item => item.travel);
        calculateControlLimits(t, 'travel');
        const s = response.data.map(item => item.shoping);
        calculateControlLimits(s, 'shopping');
        const m = response.data.map(item => item.medicine);
        calculateControlLimits(m, 'medicine');
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchIncomes();
   const interval = setInterval(() => {
      fetchIncomes();
    }, 1000); // Fetch data every second

    return () => clearInterval(interval);
  }, []);

  const calculateControlLimits = (dataArray, category) => {
    const mean = dataArray.reduce((acc, curr) => acc + curr, 0) / dataArray.length;
    const stdDev = Math.sqrt(dataArray.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / dataArray.length);

    const controlLimit = mean;
    const upperControlLimit = mean + 3 * stdDev;
    const lowerControlLimit = mean - 3 * stdDev;

    switch (category) {
      case 'food':
        setCL_f(controlLimit.toFixed(2));
        setUCL_f(upperControlLimit.toFixed(2));
        setLCL_f(lowerControlLimit.toFixed(2));
        break;
      case 'travel':
        setCL_t(controlLimit.toFixed(2));
        setUCL_t(upperControlLimit.toFixed(2));
        setLCL_t(lowerControlLimit.toFixed(2));
        break;
      case 'shopping':
        setCL_s(controlLimit.toFixed(2));
        setUCL_s(upperControlLimit.toFixed(2));
        setLCL_s(lowerControlLimit.toFixed(2));
        break;
      case 'medicine':
        setCL_m(controlLimit.toFixed(2));
        setUCL_m(upperControlLimit.toFixed(2));
        setLCL_m(lowerControlLimit.toFixed(2));
        break;
      default:
        break;
    };
  }

  const label = (data.length > 0 && data.length <= 15) 
  ? Array.from({ length: data.length }, (v, k) => k + 1) 
  : [0];
  
  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: 'lightblue',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2,
    color: (opacity = 1) => `white`,
    labelColor: (opacity = 1) => `black`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: 'lightblue',
    },
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Check if data is empty
  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No data available</Text>
      </View>
    );
  }

  const createChartData = (dataKey, cl, ucl, lcl) => {
    const dataset = data.map(item => item[dataKey]);
    if (dataset.every(val => val === 0)) {
      return {
        labels: label,
        datasets: [{ data: [] }],
      };
    }

    return {
      labels: label,
      datasets: [
        {
          data: dataset,
          strokeWidth: 2,
        },
        {
          data: Array(data.length).fill(cl),
          color: () => `black`,
          strokeWidth: 1,
          withDots: false,
          strokeDashArray: [7, 5],
        },
        {
          data: Array(data.length).fill(ucl),
          color: () => `red`,
          strokeWidth: 1,
          withDots: false,
          strokeDashArray: [7, 5],
        },
        {
          data: Array(data.length).fill(lcl),
          color: () => `blue`,
          strokeWidth: 1,
          withDots: false,
          strokeDashArray: [7, 5],
        },
      ],
    };
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {cl_f !== null ? (
          <>
            <Text style={styles.header}>food</Text>
            <View>
              <LineChart
                data={createChartData('food', cl_f, ucl_f, lcl_f)}
                width={screenWidth - 5}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          </>
        ) : (
          <Text></Text>
        )}
        
        {cl_t !== null ? (
          <>
            <Text style={styles.header}>travel</Text>
            <View>
              <LineChart
                data={createChartData('travel', cl_t, ucl_t, lcl_t)}
                width={screenWidth - 5}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          </>
        ) : (
          <Text></Text>
        )}

        {cl_s !== null ? (
          <>
            <Text style={styles.header}>shopping</Text>
            <View>
              <LineChart
                data={createChartData('shoping', cl_s, ucl_s, lcl_s)}
                width={screenWidth - 5}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          </>
        ) : (
          <Text></Text>
        )}

        {cl_m !== null ? (
          <>
            <Text style={styles.header}>medicine</Text>
            <View>
              <LineChart
                data={createChartData('medicine', cl_m, ucl_m, lcl_m)}
                width={screenWidth - 5}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          </>
        ) : (
          <Text></Text>
        )}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 5,
  },
});

export default App;
