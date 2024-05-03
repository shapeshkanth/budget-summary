import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Avatar } from 'react-native-elements';
import  income from './src/income';
import expense from './src/expense'; 
import graph from './src/graph'; 
import summary from './src/summary';

const Drawer = createDrawerNavigator();

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

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Income">{income}</Drawer.Screen>
        <Drawer.Screen name="Expenses">{expense}</Drawer.Screen>
        <Drawer.Screen name="Graph">{graph}</Drawer.Screen>
        <Drawer.Screen name="Summary">{summary}</Drawer.Screen>
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
