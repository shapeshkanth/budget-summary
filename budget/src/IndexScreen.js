import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import  { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerIt } from '@react-navigation/drawer';
import { useRoute } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import income from './income';
import expense from './expense'; 
import graph from './graph'; 
import summary from './summary';
import details from './details';
import logout from './LogoutScreen';

const Drawer = createDrawerNavigator();
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


const CustomDrawerContent = (props) => {
const route = useRoute();
const { userid, username, email } = route.params;
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Avatar
          rounded
          source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
          size="large"
        />
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.userEmail}>{email}</Text>  
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const getDrawerIcon = (route, focused, color, size) => {
  let iconName;
  switch (route.name) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Income':
      iconName = focused ? 'cash' : 'cash-multiple';
      break;
    case 'Today Expenses':
      iconName = focused ? 'cart' : 'cart-outline';
      break;
    case 'Graph':
      iconName = focused ? 'chart-bar' : 'chart-bar';
      break;
    case 'Summary':
      iconName = focused ? 'format-list-bulleted' : 'format-list-bulleted-type';
      break;
    case 'Details':
      iconName = focused ? 'account-details' : 'account-details-outline';
      break;
    case 'Logout':
      iconName = focused ? 'logout' : 'logout-variant';
      break;
    default:
      iconName = focused ? 'information' : 'information-outline';
  }
  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
};

const IndexScreen = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color, size }) => getDrawerIcon(route, focused, color, size),
      })}
    >
      <Drawer.Screen 
        name="Home" 
        component={Home} 
        options={{ title: 'Home' }}
      />
      <Drawer.Screen 
        name="Income" 
        component={income} 
        options={{ title: 'Income' }}
      />
      <Drawer.Screen 
        name="Today Expenses" 
        component={expense} 
        options={{ title: 'Today Expenses' }}
      />
      <Drawer.Screen 
        name="Graph" 
        component={graph} 
        options={{ title: 'Graph' }}
      />
      <Drawer.Screen 
        name="Summary" 
        component={summary} 
        options={{ title: 'Summary' }}
      />
      <Drawer.Screen 
        name="Details" 
        component={details} 
        options={{ title: 'Details' }}
      />
      <Drawer.Screen 
        name="Logout" 
        component={logout} 
        options={{ title: 'Logout' }}
      />
    </Drawer.Navigator>
  );
};

const Home = () => {

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
    }  

    const calculateProgress = (amount, totalIncome) => {
        return (amount / totalIncome) * 100;
      }

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
    <View style={styles.container2}>
    <Text style={styles.title}>Today summary</Text>
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
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        marginTop: 25,
      },
      drawerHeader: {
        padding: 20,
        backgroundColor: '#85C2FF',
        flexDirection: 'column',
        alignItems: 'center',
      },
      userPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
      },
      username: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      userEmail: {
        fontSize: 14,
        color: 'black',
        marginTop:-7,
      },
      content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        fontSize: 20,
        marginBottom: 10,
      },
      container1: {
        flex: 1,
        width: '100%',
        marginTop: 5,
        marginBottom: 5,
        
      },
      container2: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
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
        
        
      
      }
});

export default IndexScreen;