import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Avatar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import MaterialCommunityIcons
import income from './src/income';
import expense from './src/expense'; 
import graph from './src/graph'; 
import summary from './src/summary';

const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Avatar // Use Avatar component for user avatar
          rounded
          source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}} // Provide the URI of the user avatar
          size="large"
        />
         <Text style={styles.username}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@example.com</Text>  
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

// Function to render drawer icons
const getDrawerIcon = (route, focused, color, size) => {
  let iconName;
  switch (route.name) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Income':
      iconName = focused ? 'cash' : 'cash-multiple';
      break;
    case 'Expenses':
      iconName = focused ? 'cart' : 'cart-outline';
      break;
    case 'Graph':
      iconName = focused ? 'chart-bar' : 'chart-bar';
      break;
    case 'Summary':
      iconName = focused ? 'format-list-bulleted' : 'format-list-bulleted-type';
      break;
    default:
      iconName = focused ? 'information' : 'information-outline';
  }
  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen 
          name="Home" 
          component={Home} 
          options={({ focused, color, size }) => ({
            drawerIcon: ({ color, size }) => getDrawerIcon('Home', focused, color, size),
          })}
        />
        <Drawer.Screen 
          name="Income" 
          component={income} 
          options={({ focused, color, size }) => ({
            drawerIcon: ({ color, size }) => getDrawerIcon('Income', focused, color, size),
          })}
        />
        <Drawer.Screen 
          name="Expenses" 
          component={expense} 
          options={({ focused, color, size }) => ({
            drawerIcon: ({ color, size }) => getDrawerIcon('Expenses', focused, color, size),
          })}
        />
        <Drawer.Screen 
          name="Graph" 
          component={graph} 
          options={({ focused, color, size }) => ({
            drawerIcon: ({ color, size }) => getDrawerIcon('Graph', focused, color, size),
          })}
        />
        <Drawer.Screen 
          name="Summary" 
          component={summary} 
          options={({ focused, color, size }) => ({
            drawerIcon: ({ color, size }) => getDrawerIcon('Summary', focused, color, size),
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Your home screen content */}
    </View>
  );
};

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
    color: 'white',
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
});

export default App;
